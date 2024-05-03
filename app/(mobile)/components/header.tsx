"use client";
import Link from "next/link";
import style from "@/styles/mobile-header.module.css";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
    const path = usePathname();
    return <div className={style.header}>
        <div className={style.header_bar}></div>
        <div className={style.gnb_wrap}>
            <Link href="/" className={style.home_link}>
                <i>프로퍼티파트너스</i>
            </Link>
            <button className={style.logout} onClick={async (e) => { e.preventDefault(); await signOut(); }}><i>로그아웃</i></button>
            <ul className={style.menu}>                
                <li aria-selected={path==="/member" ? true : false}>
                    <Link href="/member" className={style.link}>회원관리</Link>
                </li>               
                <li aria-selected={path==="/sales" ? true : false}>
                    <Link href="/sales" className={style.link}>매출내역</Link>
                </li>               
                <li aria-selected={path==="/settlement" ? true : false}>
                    <Link href="/settlement" className={style.link}>정산내역</Link>
                </li>               
                <li aria-selected={path==="/contract" ? true : false}>
                    <Link href="/contract" className={style.link}>계약관리</Link>
                </li>
            </ul>
        </div>
    </div>
}