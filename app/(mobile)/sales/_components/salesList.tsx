"use client";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getSales } from "../_lib/getSales";

interface Item {
    page: number;
    data: any;
}
export default function SalesList({ sawonCode }: { sawonCode: number }) {

    const { 
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery<Item[], Object, InfiniteData<Item[]>, [_1: string, _2: string, _3: number], number>({
        queryKey: ["member", "sales", sawonCode],
        queryFn: getSales,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.page,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });
    useEffect(() => {
        if(inView) {
            console.log(data);
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);
    return <>
        <div>
            {data?.pages.flatMap(page => page.data).map((item: any) => (
            <div key={item.salesSeq}>{item.salesSeq}</div>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </div>
    </>
}