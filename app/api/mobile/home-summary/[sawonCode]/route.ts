import executeQuery from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: { sawonCode: number } },
    response: NextResponse
) {
    try {
        const sawonCode = params.sawonCode
        
        const sql = "select * from ( select 'aipartner' as title, count(*) as count from tb_data_member where 상품유형 = '이실장' and sawonCode = ? and useYn = 'Y' union all select 'MK' as title, count(*) as count from tb_data_member where 상품유형 <> '이실장' and sawonCode = ? and useYn = 'Y' ) as a";
        const result = await executeQuery(sql, [sawonCode, sawonCode]) as unknown[];
        //const row = result[0] as any[];
        //const getdata = JSON.parse(JSON.stringify(row))

        console.log(result);
        return new Response(JSON.stringify(result));

        //response.status(200).json(row);
    } catch (error) {
        console.error('데이터 업로드 오류:', error);
        //res.status(500).json({ message: '데이터 업로드 중 오류가 발생했습니다.' });
      }
};