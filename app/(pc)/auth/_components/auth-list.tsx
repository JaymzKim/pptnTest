"use client";
import style from "@/styles/pc.module.css";
import Link from "next/link";
import Pagination from "@/app/(pc)/_components/pagination";
import AuthSearchFilter from "./auth-search-filter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getList } from "../_lib/getList";
import { useRouter } from "next/navigation";

interface Item {
    page: number;
}

type Props = {
    searchParams: { p: string, q?: string };
}
export default function AuthList({ searchParams }: { searchParams: any}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const page = Number(searchParams?.page ?? 1);
    const { data } = useQuery<Item[], Object, Item[], [_1: string, _2: string, Props['searchParams']]>({
        queryKey: ["admin", "auth", searchParams],
        queryFn: getList,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    }) as any;

    return <>
        <div className={style.list_contents}>
            <div className={style.list_header}>
                <AuthSearchFilter searchText={searchParams?.query} />
                <Link className={style.write} href={`/modal/auth`}>신규작성</Link>
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
                        {data?.total > 0 ? (
                            data?.data.map((item: any) => (
                            <tr key={item.sawonCode} onClick={() => router.push(`/modal/auth/${item.sawonCode}`)}>
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
            <Pagination page={page} total={data?.total} />
        </div>
    </>
}