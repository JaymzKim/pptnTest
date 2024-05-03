import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        
        const sql = `select jobCode as code, jobName as title from tb_pptn_jobcode where useYn = 'Y' and jobName > ''`;
        const result = await executeQuery(sql, []) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: error });
    }
}