import style from "@/styles/pc.module.css";
import { fetchItems } from "./fetch-items";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "./pagination";
import AuthSearchFilter from "./auth-search-filter";

export default async function AuthList({ searchParams }: { searchParams: any}) {
    const page = Number(searchParams?.page ?? 1);

    const items = await fetchItems(`${process.env.NEXTAUTH_URL}/api/pc/auth-list?page=${page}${searchParams?.query ? `&query=${searchParams?.query}` : ""}`);

    return <>
        <div className={style.list_wrap}>
            <div className={style.list_title}>
                <h5 className={style.title}>계정관리</h5>
            </div>
            <div className={style.list_contents}>
                <div className={style.list_header}>
                    <AuthSearchFilter searchText={searchParams?.query} />
                    <Link className={style.write} href={`/modal/notice`}>신규작성</Link>
                </div>
                <div className={style.table_wrap}>
                    <table>
                        <colgroup>
                            <col width="199px" />
                            <col width="199px" />
                            <col width="199px" />
                            <col width="199px" />
                            <col />
                            <col width="199px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>센터</th>
                                <th>파트</th>
                                <th>직책</th>
                                <th>아이디</th>
                                <th>계정생성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.total > 0 ? (
                                items.data.map((item: any) => (
                                <tr key={item.sawonCode}>
                                    <td>{item.name}</td>
                                    <td>{item.centerName}</td>
                                    <td>{item.centerName}</td>
                                    <td>{item.jobName}</td>
                                    <td>{item.swId}</td>
                                    <td>{item.regDate ? item.regDate : "-"}</td>
                                </tr>
                                ))
                            ) : (
                            <tr>
                                <td colSpan={6} className={style.no_data}>등록된 계정이 없습니다.</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} total={items.total} />
            </div>
        </div>
    </>
}