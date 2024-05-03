import style from "@/styles/member-skeleton.module.css";
export function MemberLoading() {
    return <>
        {new Array(5).fill(1).map((_, i) => (
        <div key={i} className={style.item_wrap}>
            <div className={style.company}></div>
            <div className={style.user}>
                
                <span className={style.phone}></span>
            </div>
            <div className={style.address}></div>
            <div className={style.table_wrap}>
            </div>
            <div className={style.table_wrap}>
            </div>
        </div>
        ))}
    </>
}