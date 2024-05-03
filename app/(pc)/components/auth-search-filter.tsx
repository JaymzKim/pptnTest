"use client";
import style from "@/styles/pc.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthSearchFilter({ searchText }: { searchText: string }) {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(searchText);

    const handleSearchInputChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        router.push(`?query=${searchValue}`);
    };

    const handleKeyPress = (e: any) => {
        if(e.key === "Enter") {
            handleSearch();
        }
    };

    return <div className={style.filter_wrap}>
        <div className={style.search_box}>
            <div className={style.input_box}>
                <input type="text" name="search" value={searchValue || ""} placeholder="이름/아이디" onChange={handleSearchInputChange} onKeyPress={handleKeyPress} />
            </div>
            <button type="button" className={style.search_btn} onClick={handleSearch}>검색</button>
        </div>
    </div>
}