import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    try {
        
        const sql = `select a.sawonCode, a.swId, a.swPwd, a.jojikCode, a.jobCode, a.name, b.centerName, b.partName, c.jobName from tb_pptn_sawon a inner join tb_pptn_jojikcode b on a.jojikCode = b.jojikCode inner join tb_pptn_jobcode c on a.jobCode = c.jobCode where a.sawonCode = ?`;
        const result = await executeQuery(sql, [searchParams.get("sawonCode")]) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result[0] });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: `데이터 업로드 중 오류가 발생했습니다.\n\r${error}` });
    }
}