import { auth } from "@/auth";
import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    try {
        const countSql = `select count(*) as count from tb_board_notice where useYn = 'Y'`;
        const countResult = await executeQuery(countSql, []) as unknown[];
        const totalCount = JSON.parse(JSON.stringify(countResult));
        
        const sql = `select bnSeq, noticeGubun, title, viewCount, DATE_FORMAT(regDate, '%y.%m.%d') as regDate from tb_board_notice where useYn = 'Y' order by topYn, regDate desc limit ?, 10`;
        const result = await executeQuery(sql, [((Number(searchParams.get("page") ? searchParams.get("page") : 1) - 1) * 10)]) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result, total: totalCount[0].count });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        NextResponse.json({ status: "Fail", message: '데이터 업로드 중 오류가 발생했습니다.' });
    }
}