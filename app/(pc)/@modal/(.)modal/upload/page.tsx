"use client";
import UploadWrite from "./_components/modal-upload-write";
import style from "@/styles/pc-modal.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
    const { data: me } = useSession();
    const data = {};
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    return <>
        <div className={style.modal_wrap}>
            <div className={style.modal_body}>
                <div className={style.header}>자료업로드</div>
                <UploadWrite data={data} me={me} />
            </div>
        </div>
    </>
}