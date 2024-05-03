"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "./fetch-items";
import MemberList from "./member-list";
import { MemberLoading } from "./member-loading";
import filterStore from "@/store/memberFilter";


export default function LoadMore({ sawonCode }: { sawonCode: number }) {
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [noData, setNodata] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
     });
     const { filter } = filterStore();

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadMoreItems = async () => {
        await delay(1000);
        const nextPage = page + 1;
        const newItems = (await fetchItems(nextPage, sawonCode, filter)) ?? [];
        setItems((prevItems) => [...prevItems, ...newItems?.data]);
        if(newItems.total===0) setNodata(true);
        else setPage(nextPage);
    };
    useEffect(() => {
        console.log(inView);
        if(inView) {
            loadMoreItems();
        }
    }, [inView]);
    useEffect(() => {
        console.log(filter,inView);
        setItems([]);
        setPage(0);
        if(inView) {
            loadMoreItems();
        }
    }, [filter]);
    return <>
        <MemberList items={items} />
        <div ref={ref}>
            {(inView && !noData) && <MemberLoading />}
        </div>
    </>;
}