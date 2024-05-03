"use client";

import Link from "next/link";
import style from "@/styles/pc-header.module.css";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function PcHeader({ me }: { me: any }) {
    const path = usePathname();
    return <div className={style.header}>
        <div className={style.header_wrap}>
            <div className={style.gnb_wrap}>
                <Link href="/" className={style.home_link}>
                    <i>프로퍼티파트너스</i>
                </Link>
                <ul className={style.menu}>
                    <li aria-selected={path==="/" ? true : false}>
                        <Link href="/" className={style.link}>공지관리</Link>
                    </li>
                    <li aria-selected={path==="/upload" ? true : false}>
                        <Link href="/upload" className={style.link}>자료업로드</Link>
                    </li>
                    <li aria-selected={path==="/auth" ? true : false}>
                        <Link href="/auth" className={style.link}>계정관리</Link>
                    </li>
                </ul>
            </div>
            <div className={style.user_section}>
                <button className={style.logout} onClick={async (e) => { e.preventDefault(); await signOut(); }}><i>로그아웃</i></button>
                <span className={style.photo}></span>
                <strong>{me?.user.name}</strong>님, 반갑습니다.
            </div>
        </div>
    </div>
}