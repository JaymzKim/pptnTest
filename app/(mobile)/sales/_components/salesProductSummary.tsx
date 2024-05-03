import executeQuery from "@/lib/mysql";
import style from "@/styles/mobile-sales.module.css";


export default async function SalesProductSummary({ sawonCode }: { sawonCode: number }) {
    const sql = `select * from (
        (select '이실장' as title, sum(결제금액) as sale, sum(환불금액) as refund, (sum(결제금액) - sum(환불금액)) as price from tb_data_sales where sawonCode = ? and useYn = 'Y' and 상품유형 = '이실장')
        union all
        (select '매경포커스' as title, sum(결제금액) as sale, sum(환불금액) as refund, (sum(결제금액) - sum(환불금액)) as price from tb_data_sales where sawonCode = ? and useYn = 'Y' and 상품유형 = '포커스')
        union all
        (select '매경프리미엄' as title, sum(결제금액) as sale, sum(환불금액) as refund, (sum(결제금액) - sum(환불금액)) as price from tb_data_sales where sawonCode = ? and useYn = 'Y' and 상품유형 = '프리미엄')
        union all
        (select '합계' as title, sum(결제금액) as sale, sum(환불금액) as refund, (sum(결제금액) - sum(환불금액)) as price from tb_data_sales where sawonCode = ? and useYn = 'Y')
        ) a `;
    const result = await executeQuery(sql, [sawonCode, sawonCode, sawonCode, sawonCode]) as any;
    const getData = JSON.parse(JSON.stringify(result));
    
    return <>
        <div className={style.table_summury_wrap}>
            <div className={style.header} aria-label="상품별매출내역">
                상품별 매출내역
            </div>
            <div className={style.table_wrap}>
                <table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>결제액</th>
                            <th>환불액</th>
                            <th>순매출액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.map((item: any, index: number) => (
                        <tr key={index} className={item.title==="합계" ? style.total : item.title==="매경프리미엄" ? style.premium : ""}>
                            <td>{item.title}</td>
                            <td>{Number(item.sale).toLocaleString()}</td>
                            <td>{Number(item.refund).toLocaleString()}</td>
                            <td>{Number(item.price).toLocaleString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}