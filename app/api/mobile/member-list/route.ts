import { auth } from "@/auth";
import executeQuery from "@/lib/mysql";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
//export const GET = auth(async (req) => {
    
    const { searchParams } = new URL(req.url);
    const session = await auth();
    console.log("session", session, req.headers.get('cookie'), searchParams);
    const paramsArray = [searchParams.get("sawonCode")];
    let sqlWhere = " and sawonCode = ? ";
    if (searchParams.has("product_type") && searchParams.get("product_type")!=="") {
        sqlWhere += " and 상품유형 = ? ";
        paramsArray.push(searchParams.get("product_type"));
    }
    
    //const formData = Object.fromEntries(await req.formData());
    try {
        const countSql = `select count(*) as count from tb_data_member where useYn = 'Y'${sqlWhere}`;
        const countResult = await executeQuery(countSql, paramsArray) as unknown[];
        const totalCount = JSON.parse(JSON.stringify(countResult));
        console.log("formData.page",searchParams,searchParams.has("product_type"));
        const sql = `select memSeq, 회원번호, 상호명, 대표자명, 휴대폰, concat(시도, ' ', (case when 시군구 = '세종시' then '' else 시군구 end), ' ',  읍면동, ' ', 상세주소) as 주소, 시도, 시군구, 상품명, 계약구분, 결제일, DATE_FORMAT(시작일, '%y.%m.%d') as 시작일, DATE_FORMAT(종료일, '%y.%m.%d') as 종료일, 상태, 계약전송수, 전송수 from tb_data_member where useYn = 'Y'${sqlWhere} limit ?, 10`;
        const result = await executeQuery(sql, [...paramsArray, ((Number(searchParams.get("page") ? searchParams.get("page") : 1) - 1) * 10)]) as unknown[];
        
        return NextResponse.json({ status: "OK", data: result, total: totalCount[0].count });

    } catch (error) {
        console.error("읽기 오류 : ", error);
        NextResponse.json({ status: "Fail", message: '데이터 업로드 중 오류가 발생했습니다.' });
    }
}