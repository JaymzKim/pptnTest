"use client";
import style from "@/styles/pc.module.css";
import Link from "next/link";
import Pagination from "@/app/(pc)/components/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getList } from "../_lib/getList";
import NoticeItem from "./notice-item";

interface Item {
    page: number;
}

type Props = {
    searchParams: { p: string, q?: string };
}
export default function NoticeList({ searchParams }: { searchParams: any }) {
    const queryClient = useQueryClient();
    const page = Number(searchParams?.page ?? 1);
    const { data } = useQuery<Item[], Object, Item[], [_1: string, _2: string, Props['searchParams']]>({
        queryKey: ["admin", "notice", searchParams],
        queryFn: getList,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    }) as any;

    return <>
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
                        {data?.total > 0 ? (
                            data?.data.map((item: any) => (
                            <NoticeItem key={item.bnSeq} item={item} />
                            ))
                        ) : (
                        <tr>
                            <td colSpan={5} className={style.no_data}>등록된 공지사항이 없습니다.</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} total={data?.total} />
        </div>
    </>
}