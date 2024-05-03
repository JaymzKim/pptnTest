import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    try {
        
        const sql = `select a.*, b.bnFileSeq, b.fileName, b.filePath from tb_board_notice a left outer join tb_board_notice_file b on a.bnSeq = b.bnSeq and b.useYn = 'Y' where a.bnSeq = ?`;
        const result = await executeQuery(sql, [searchParams.get("bnSeq")]) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result[0] });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        return NextResponse.json({ status: "Fail", message: `데이터 업로드 중 오류가 발생했습니다.\n\r${error}` });
    }
}