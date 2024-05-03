import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        
        const sql = `select distinct centerName as title, centerCode as code from tb_pptn_jojikcode where useYn = 'Y' order by centerName`;
        const result = await executeQuery(sql, []) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: error });
    }
}