"use client";
import { useRouter } from "next/navigation";
import style from "@/styles/pc.module.css";

export default function NoticeItem({ items }: { items: any }) {
    const router = useRouter();
    return items.total > 0 ? (
        items.data.map((item: any, index: number) => (
        
            <tr key={index} onClick={() => router.push(`/modal/notice/${item.bnSeq}`)}>
                <td key={item.bnSeq}>{item.bnSeq}</td>
                <td>{item.noticeGubun}</td>
                <td className={style.title}>{item.title}</td>
                <td>{item.regDate}</td>
                <td>{item.viewCount}</td>        
            </tr>
        ))
    ) : (
    <tr>
        <td colSpan={5} className={style.no_data}>등록된 공지사항이 없습니다.</td>
    </tr>
    )
}