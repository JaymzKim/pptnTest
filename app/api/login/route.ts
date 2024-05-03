import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    
    const formData = await req.json();

    try {

        const sql = "select swId, name, sawonCode, sosok from tb_pptn_sawon where swId = ? and swPwd = SHA2(CONCAT(CONCAT('*', UPPER(SHA1(UNHEX(SHA1(?))))), 'ribo20240408!@'),256) and isStatus='재직' and useYn='Y'";
        const result = await executeQuery(sql, [formData.swId, formData.swPwd]) as unknown[];
        return NextResponse.json({status: "OK", data: result[0] });
        
    } catch (error) {
        console.error('데이터 업로드 오류:', error);
        return NextResponse.json({ message: '데이터 업로드 중 오류가 발생했습니다.' });
    }
}