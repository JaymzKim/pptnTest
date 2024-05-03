import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    try {
        
        const sql = `select partName as title, jojikCode as code from tb_pptn_jojikcode where useYn = 'Y' and centerCode = ? and partName > '' order by partName`;
        const result = await executeQuery(sql, [searchParams.get("centerCode")]) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: error });
    }
}