"use client";
import filterStore from "@/store/memberFilter";
import style from "@/styles/mobile-member.module.css";
import { useEffect, useState } from "react";
import { fetchItems } from "./fetch-items";

export default function MemberSortingBox({ sawonCode }: { sawonCode: number }) {
    const { filter } = filterStore();
    const [ count, setCount ] = useState(0);
    const sortingCode: {
        code: string,
        title: string
    }[] = [
        { code: "contract", title: "계약일순"},
        { code: "end", title: "종료일순"},
        { code: "coupon", title: "쿠폰사용률순"},
    ];
    const totalCount = async () => {
        const response = (await fetchItems(1, sawonCode, filter)) ?? [];
        setCount(response.total);
    }
    useEffect(() => {
        totalCount();
    }, [filter]);
    return <>
        <div className={style.sorting_wrap}>
            <div className={style.reponse_count}>
                검색결과 {count}개
            </div> 
            <div className={style.select_box}>
                <button type="button">{sortingCode.find((item) => item.code===filter.sorting)?.title}</button>
                <div className={style.select_box_list}></div>
            </div>        
        </div>   
    </>
}