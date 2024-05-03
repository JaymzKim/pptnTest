import executeQuery from "@/lib/mysql";
import style from "@/styles/mobile-sales.module.css";


export default async function SalesPerformanceSummary({ sawonCode }: { sawonCode: number }) {
    const sql = `select * from(
        (select 
            '결제건수' as title,
            sum(case when 계약구분 = '순수신규' and 결제금액 > '' then 1 else 0 end) as new,
            SUM(case when 계약구분 = '기존신규' and 결제금액 > '' then 1 else 0 end) as existing,
            SUM(case when 계약구분 = '만기재계약' and 결제금액 > '' then 1 else 0 end) as maturity,
            SUM(case when 계약구분 = '이월재계약' and 결제금액 > '' then 1 else 0 end) as carried
        from 
            tb_data_sales 
        where 
            sawonCode = ? 
            and useYn = 'Y' 
            and 결제금액 > '') union all
        (select 
            '환불건수' as title,
            sum(case when 계약구분 = '순수신규' and 환불금액 > '' then 1 else 0 end) as new,
            SUM(case when 계약구분 = '기존신규' and 환불금액 > '' then 1 else 0 end) as existing,
            SUM(case when 계약구분 = '만기재계약' and 환불금액 > '' then 1 else 0 end) as maturity,
            SUM(case when 계약구분 = '이월재계약' and 환불금액 > '' then 1 else 0 end) as carried
        from 
            tb_data_sales 
        where 
            sawonCode = ? 
            and useYn = 'Y' 
            and 환불금액 > '')
            ) a `;
    const result = await executeQuery(sql, [sawonCode, sawonCode]) as any;
    const getData = JSON.parse(JSON.stringify(result));
    
    return <>
        <div className={style.table_summury_wrap}>
            <div className={style.header} aria-label="이실장영업실적">
                이실장 영업실적(건수)
            </div>
            <div className={style.table_wrap}>
                <table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>순수신규</th>
                            <th>기존신규</th>
                            <th>만기재계약</th>
                            <th>이월재계약</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{Number(item.new).toLocaleString()}</td>
                            <td>{Number(item.existing).toLocaleString()}</td>
                            <td>{Number(item.maturity).toLocaleString()}</td>
                            <td>{Number(item.carried).toLocaleString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}