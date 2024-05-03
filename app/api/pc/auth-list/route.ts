import { auth } from "@/auth";
import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    try {
        let sqlWhere = "";
        const paramsArray = [];
        if (searchParams.has("query") && searchParams.get("query")!=="") {
            sqlWhere += " and (a.name like concat('%', ?, '%') or a.swId like concat('%', ?, '%')) ";
            paramsArray.push(searchParams.get("query"), searchParams.get("query"));
        }

        const countSql = `select count(*) as count from tb_pptn_sawon a where a.useYn = 'Y'${sqlWhere}`;
        const countResult = await executeQuery(countSql, paramsArray) as unknown[];
        const totalCount = JSON.parse(JSON.stringify(countResult));
        paramsArray.push(((Number(searchParams.get("page") ? searchParams.get("page") : 1) - 1) * 10))
        const sql = `select a.sawonCode, a.name, b.centerName, b.partName, c.jobName, a.swId, DATE_FORMAT(a.regDate, '%y.%m.%d') as regDate from tb_pptn_sawon a inner join tb_pptn_jojikcode b on a.jojikCode = b.jojikCode inner join tb_pptn_jobcode c on a.jobCode = c.jobCode where a.useYn = 'Y'${sqlWhere} limit ?, 10`;
        const result = await executeQuery(sql, paramsArray) as unknown[];
        return NextResponse.json({ status: "OK", data: result, total: totalCount[0].count });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        NextResponse.json({ status: "Fail", message: '데이터 업로드 중 오류가 발생했습니다.' });
    }
}