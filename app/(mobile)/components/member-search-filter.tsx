"use client";
import style from "@/styles/mobile-search.module.css";
import { useState } from "react";
import filterStore from "@/store/memberFilter";

export default function MemberSearchFilter() {
    const { filter, setFilter } = filterStore();

    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        setFilter({ ...filter, search: searchValue });
    };

    const handleKeyPress = (e: any) => {
        if(e.key === "Enter") {
            handleSearch();
        }
    };
    return <>
        <div className={style.search_wrap}>
            <div className={style.search_type}>
                <div className={style.radiobox_wrap}>
                    <input id="product0" type="radio" name="product_type" value="" checked={filter.product_type==="" ? true : false} onChange={(e) => { setFilter({ product_type: e.target.value }); }} />
                    <label htmlFor="product0" className={style.radio_label}>통합</label>
                </div>
                <div className={style.radiobox_wrap}>
                    <input id="product1" type="radio" name="product_type" value="이실장" checked={filter.product_type==="이실장" ? true : false}  onChange={(e) => { setFilter({ product_type: e.target.value }); }} />
                    <label htmlFor="product1" className={style.radio_label}>이실장</label>
                </div>
                <div className={style.radiobox_wrap}>
                    <input id="product2" type="radio" name="product_type" value="포커스" checked={filter.product_type==="포커스" ? true : false} onChange={(e) => { setFilter({ product_type: e.target.value }); }} />
                    <label htmlFor="product2" className={style.radio_label}>포커스</label>
                </div>
                <div className={style.radiobox_wrap}>
                    <input id="product3" type="radio" name="product_type" value="프리미엄" checked={filter.product_type==="프리미엄" ? true : false} onChange={(e) => { setFilter({ product_type: e.target.value }); }} />
                    <label htmlFor="product3" className={style.radio_label}>프리미엄</label>
                </div>
            </div>
            <div className={style.inputbox_wrap}>
                <input type="text" name="search" placeholder="상호명 / 지역명 / 연락처" onChange={handleSearchInputChange} onKeyPress={handleKeyPress} />
                <button type="button" className={style.search_btn} onClick={handleSearch}>검색</button>
            </div>
        </div>
    </>
}