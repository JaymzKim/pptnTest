import executeQuery from "@/lib/mysql";
import { supabase } from "@/lib/supabase-client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
    const getIp = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').trim().split(',')
    const ipCheck =  getIp.length > 1 ? getIp[getIp.length - 1].trim() : getIp
    const ip = ipCheck
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const files = formData.getAll('file') as File[];
    const fileToStorage = files[0];
    //console.log(fileToStorage)
    //console.log(Buffer.from(fileToStorage.name, "latin1").toString("utf8"));
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:]/g, '').replace('T', '-');
    const originFile = fileToStorage ? Buffer.from(fileToStorage.name, "latin1").toString("utf8") : "";
    const fileNameParts = originFile.split('.');
    const extension = fileNameParts.pop();

    const filePath = `/public/files/pptn_notice_${timestamp}.${extension}`;

    try {

        if(body.bnSeq) {

            let sqlSet = " noticeGubun = ?,";
            const setArray = [body.noticeGubun];
            sqlSet += " dispYn = ?,";
            setArray.push(body.dispYn);            
            sqlSet += " topYn = ?,";
            setArray.push(body.topYn);
            if(fileToStorage) {
                sqlSet += " fileYn = ?,";
                setArray.push(fileToStorage ? "Y" : "N");
            }            
            sqlSet += " title = ?,";
            setArray.push(body.title);            
            sqlSet += " contents = ?,";
            setArray.push(body.contents);          
            sqlSet += " workSawonNo = ?,";
            setArray.push(body.sawonCode);          
            sqlSet += " workIp = ? ";
            setArray.push(body.ip);
            setArray.push(body.bnSeq);
            
            const query = `update tb_board_notice set ${sqlSet}, modDate = now() where bnSeq = ?`;
            await executeQuery(query, setArray);

            if(fileToStorage) {
                const { done, value } = await fileToStorage.stream().getReader().read();
                fs.createWriteStream(filePath).write(value);
                await executeQuery(`update tb_board_notice_file set fileName = ? , filePath = ?, modDate = now() where bnFileSeq = ?`, [originFile, filePath, body.bnFileSeq]);
            }        
            return NextResponse.json({ status: "OK", message: "정상적으로 등록했습니다." });

        } else {
            const query = `INSERT INTO tb_board_notice (noticeGubun, dispYn, topYn, fileYn, title, contents, regDate, useYn, workSawonNo, workIp) VALUES (?, ?, ?, ?, ?, ?, now(), ?, ?, ? )`;
            await executeQuery(query, [body.noticeGubun, body.dispYn, body.topYn, (fileToStorage ? "Y" : "N"), body.title, body.contents, "Y", body.sawonCode, ip]);

            const rows = await executeQuery("SELECT LAST_INSERT_ID()",[]) as any[];
            const lastInsertId = rows[0]["LAST_INSERT_ID()"];

            if(fileToStorage) {
                const { done, value } = await fileToStorage.stream().getReader().read();
                fs.createWriteStream(filePath).write(value);
                await executeQuery(`insert into tb_board_notice_file (bnSeq, fileName, filePath, regDate, useYn) values (?, ?, ?, now(), ?)`, [lastInsertId, originFile, filePath, 'Y']);
            }        
            return NextResponse.json({ status: "OK", message: "정상적으로 등록했습니다." });
        }

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: `데이터 업로드 중 오류가 발생했습니다.\n\r${error}` });
    }
}