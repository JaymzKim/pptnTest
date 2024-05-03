import style from "@/styles/pc-modal.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function NoticeView({ data, handleModify }: { data: any, handleModify: any }) {
    const { data: session } = useSession();
    const router = useRouter();


    const handleClose = () => {
        router.back();
    }


    return <div className={style.contents}>
        <div className={style.write_form}>
            <div className={style.input_div}>
                <label className={style.input_label}>제목</label>
                {data?.title}
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>내용</label>
                {data?.contents}
            </div>
            {data.fileYn==="Y" && data.filePath ? (
            <div className={style.input_div}>
                <label className={style.input_label}>첨부파일</label>
                <a href={`/public/files/${data?.filePath}`} download>{data?.filePath}</a>
            </div>
            ) : null}
        </div>                    
        <div className={style.btn_wrap}>
            <button type="button" className={style.list} onClick={handleClose}>목록</button>
            <button type="button" className={style.modify} onClick={handleModify}>수정</button>
            <button type="button" className={style.cancel} onClick={handleClose}>취소</button>
        </div>
    </div>
}