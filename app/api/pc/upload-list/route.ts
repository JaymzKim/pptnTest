import { auth } from "@/auth";
import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    try {
        const countSql = `select count(*) as count from tb_upload_log_test where useYn = 'Y'`;
        const countResult = await executeQuery(countSql, []) as unknown[];
        const totalCount = JSON.parse(JSON.stringify(countResult));
        
        const sql = `select a.upchaSeq, (case when a.dataGubun = '1' then '회원내역' when a.dataGubun = '2' then '매출내역' when a.dataGubun = '3' then '정산내역' else '기타' end) as dataGubun, a.title, a.fileName, DATE_FORMAT(a.regDate, '%y.%m.%d') as regDate, a.statusGubun, b.name from tb_upload_log_test a inner join tb_pptn_sawon b on a.workSawonNo = b.sawonCode where a.useYn = 'Y' order by a.regDate desc limit ?, 10`;
        const result = await executeQuery(sql, [((Number(searchParams.get("page") ? searchParams.get("page") : 1) - 1) * 10)]) as unknown[];
        return NextResponse.json({ status: "OK", data: result, total: totalCount[0].count });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        NextResponse.json({ status: "Fail", message: '데이터 업로드 중 오류가 발생했습니다.' });
    }
}