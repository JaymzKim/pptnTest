import style from "@/styles/pc.module.css";
import Link from "next/link";

export default function Pagination({ page, total }: { page: number, total: number }) {

    const perPage = 10;
    const totalPages = Math.ceil(total / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    
    const pageNumbers = [];
    const offsetNumber = 4;
    for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }

    return <div className={style.pagination_wrap}>
    {page === 1 ? (
        <div className={style.prev} aria-disabled="true">
            이전
        </div>
    ) : (
        <Link href={`?page=${prevPage}`} className={style.prev}>
            이전
        </Link>
    )}
    {pageNumbers.map((pageNumber, index) => (
    <Link key={index} className={style.page} href={`?page=${pageNumber}`} aria-selected={page===pageNumber ? true : false}>
        {pageNumber}
    </Link>
    ))}
    {page === totalPages ? (
        <div className={style.next} aria-disabled="true">
            다음
        </div>
    ) : (
        <Link href={`?page=${nextPage}`} className={style.next}>
            다음
        </Link>
    )}
    </div>
}