import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import * as XLSX from "xlsx";
import executeQuery from "@/lib/mysql";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const getIp = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').trim().split(',')
    const ipCheck =  getIp.length > 1 ? getIp[getIp.length - 1].trim() : getIp
    const ip = ipCheck

    if(req.method === "POST") {
        try {
            const session = await auth();
            const sawonData = JSON.parse(JSON.stringify(session));


            const file = body.file;
            const files = formData.getAll('file') as File[];
            const fileToStorage = files[0];
            const fileName = Buffer.from(fileToStorage.name, "latin1").toString("utf8");
            const data = new Uint8Array(await new Response(file).arrayBuffer());
            const workbook = XLSX.read(data, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet) as any;

            const insertData = [];
            if(body.dataGubun==="1") {
                for (let i = 0; i < jsonData.length; i++) {
                    insertData.push([
                        jsonData[i]["상품유형"],
                        jsonData[i]["상품명"],
                        jsonData[i]['회원번호'],
                        jsonData[i]['상호명'],
                        jsonData[i]['사업자번호'],
                        jsonData[i]['대표자명'],
                        jsonData[i]['휴대폰 번호'],
                        jsonData[i]['시도'],
                        jsonData[i]['구시군'],
                        jsonData[i]['읍면동'],
                        jsonData[i]['상세주소'],
                        jsonData[i]['계약구분'],
                        jsonData[i]['결제일'],
                        jsonData[i]['시작일'],
                        jsonData[i]['종료일'],
                        jsonData[i]['담당자'],
                        jsonData[i]['상태'],
                        jsonData[i]['계약전송수'],
                        jsonData[i]['전송수'],
                        jsonData[i]['계약단지']
                    ]);
                }
                
                const uploadSql = `insert into tb_upload_log_test (dataGubun, calYm, title, contents, fileName, filePath, totalCount, succeseCount, statusGubun, resultMessage, regDate, modDate, useYn, workSawonNo, workIp) values (?, ?, ?, ?, ?, '', ?, 0, 'W', '', sysdate(), SYSDATE(), 'Y', ?, ?)`;
                await executeQuery(uploadSql, [body.dataGubun, `${body.year}${body.month}`, body.title, body.contents, fileName, insertData.length, body.sawonCode, ip]);
                const rows = await executeQuery("SELECT LAST_INSERT_ID()",[]) as any[];
                const lastInsertId = rows[0]["LAST_INSERT_ID()"];
                console.log("last", lastInsertId);

                const placeholders = Array.from({ length: 20 }, () => '?').join(',');
                const valuePlaceholders = insertData.map(row => `(1, 1, ${row.map(() => '?').join(',')}, now(), 'Y')`).join(',');
                const query = `INSERT INTO tb_upload_member_log_test (upchaSeq, 상품유형, 상품명, 회원번호, 상호명, 사업자번호, 대표자명, 휴대폰, 시도, 시군구, 읍면동, 상세주소, 계약구분, 결제일, 시작일, 종료일, 담당자, 상태, 계약전송수, 전송수, 계약단지명, regDate, useYn) VALUES ${valuePlaceholders}`;
                await executeQuery(query, insertData.flat());
                
                await executeQuery(`update tb_upload_log_test set succeseCount = ( select count(*) from tb_upload_sales_log_test where upchaSeq = ?) where upchaSeq = ?`, [lastInsertId, lastInsertId]);
                
            } else if(body.dataGubun==="2") {
                for (let i = 0; i < jsonData.length; i++) {
                    insertData.push([
                        jsonData[i]["상품유형"],
                        jsonData[i]["상품명"],
                        jsonData[i]['회원번호'],
                        jsonData[i]['상호명'],
                        jsonData[i]['사업자번호'],
                        jsonData[i]['대표자명'],
                        jsonData[i]['휴대폰'],
                        jsonData[i]['시도'],
                        jsonData[i]['구시군'],
                        jsonData[i]['읍면동'],
                        jsonData[i]['상세주소'],
                        jsonData[i]['계약구분'],
                        jsonData[i]['결제일'],
                        jsonData[i]['결제금액'],
                        jsonData[i]['시작일'],
                        jsonData[i]['종료일'],
                        jsonData[i]['환불일'],
                        jsonData[i]['환불액'],
                        jsonData[i]['담당자'],
                        jsonData[i]['상태'],
                        jsonData[i]['계약단지']
                    ]);
                }
                const uploadSql = `insert into tb_upload_log_test (dataGubun, calYm, title, contents, fileName, filePath, totalCount, succeseCount, statusGubun, resultMessage, regDate, modDate, useYn, workSawonNo, workIp) values (?, ?, ?, ?, ?, '', ?, 0, 'W', '', sysdate(), SYSDATE(), 'Y', ?, ?)`;
                await executeQuery(uploadSql, [body.dataGubun, `${body.year}${body.month}`, body.title, body.contents, fileName, insertData.length, body.sawonCode, ip]);
                const rows = await executeQuery("SELECT LAST_INSERT_ID()",[]) as any[];
                const lastInsertId = rows[0]["LAST_INSERT_ID()"];
                console.log("last", lastInsertId);


                const placeholders = Array.from({ length: 22 }, () => '?').join(',');
                const valuePlaceholders = insertData.map(row => `(${lastInsertId}, ${row.map(() => '?').join(',')}, sysdate(), SYSDATE())`).join(',');

                const query = `INSERT INTO tb_upload_sales_log_test (upchaSeq, 상품유형, 상품명, 회원번호, 상호명, 사업자번호, 대표자명, 휴대폰, 시도, 시군구, 읍면동, 상세주소, 계약구분, 결제일, 결제금액, 시작일, 종료일, 환불일, 환불금액, 담당자, 상태, 계약단지,regDate, modDate) VALUES ${valuePlaceholders}`;
                await executeQuery(query, insertData.flat());

                await executeQuery(`update tb_upload_log_test set succeseCount = ( select count(*) from tb_upload_sales_log_test where upchaSeq = ?) where upchaSeq = ?`, [lastInsertId, lastInsertId]);

            }



            return NextResponse.json({ status: "OK", message: "정상적으로 등록했습니다." });
        } catch (error) {
        console.error('데이터 업로드 오류:', error);
        return NextResponse.json({ status: "Fail", message: '데이터 업로드 중 오류가 발생했습니다.' });
        }
  } else {
    console.log(req.method);
  }
}