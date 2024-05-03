import style from "@/styles/pc.module.css";
import { fetchItems } from "./fetch-items";
import Link from "next/link";
import Pagination from "./pagination";
import NoticeItem from "./notice-item";


export default async function NoticeList({ searchParams }: { searchParams: any }) {
    const page = Number(searchParams?.page ?? 1);
    
    const items = await fetchItems(`${process.env.NEXTAUTH_URL}/api/pc/notice-list?page=${page}`);
    
    return <>
        <div className={style.list_wrap}>
            <div className={style.list_title}>
                <h5 className={style.title}>공지관리</h5>
            </div>
            <div className={style.list_contents}>
                <div className={style.list_header}>
                    <Link className={style.write} href={`/modal/notice`}>신규작성</Link>
                </div>
                <div className={style.table_wrap}>
                    <table>
                        <colgroup>
                            <col width="102px" />
                            <col width="174px" />
                            <col />
                            <col width="174px" />
                            <col width="102px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th>제목</th>
                                <th>작성일</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            <NoticeItem items={items} />
                        </tbody>
                    </table>
                </div>                
                <Pagination page={page} total={items.total} />
            </div>
        </div>
    </>
}