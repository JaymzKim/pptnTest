import executeQuery from "@/lib/mysql";
import style from "@/styles/mobile.module.css";

export default async function HomeSummary({ sawonCode }: { sawonCode: number }) {

    type Item = {
        title: string;
        count: number;
    };
    
    const sql = "select * from ( select '이실장' as title, count(*) as count from tb_data_member where 상품유형 = '이실장' and sawonCode = ? and useYn = 'Y' union all select '매경' as title, count(*) as count from tb_data_member where 상품유형 <> '이실장' and sawonCode = ? and useYn = 'Y' ) as a";
    const result = await executeQuery(sql, [sawonCode, sawonCode]) as unknown[];
    const getData = JSON.parse(JSON.stringify(result));
    console.log(getData);
    return <div className={style.home_summary}>
        <div className={style.summary_wrap}>
        {getData.map((item: Item) => (
            <div key={item.title} className={style.item_wrap}>
                <h5 className={style.title}>{item.title}</h5>
                <strong className={style.count}>{item.count}</strong>
            </div>
        ))}
        </div>
        <p className={style.info}>* 라이브 회원 현황으로 이동합니다.</p>
    </div>
}