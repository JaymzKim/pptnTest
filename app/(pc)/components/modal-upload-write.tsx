import style from "@/styles/pc-modal.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UploadWrite({ data, me, searchParams }: { data: any, me: any, searchParams?: any }) {
    
    const dataCode: {
        code: string,
        title: string
    }[] = [
        { code: "1", title: "회원내역"},
        { code: "2", title: "매출내역"},
        { code: "3", title: "정산내역"},
        { code: "4", title: "신규리스트"},
        { code: "5", title: "만기리스트"},
        { code: "9", title: "기타"},
    ];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [modify, setModify] = useState(data?.bnSeq ? false :true);
    const [selectBox, setSelectBox] = useState(false);
    const [selectBox2, setSelectBox2] = useState(false);
    const [selectBox3, setSelectBox3] = useState(false);
    const [dataGubun, setDataGubun] = useState(data?.dataGubun ? data?.dataGubun : dataCode[0].code);
    const [year, setYear] = useState(data?.calYm?.substr(0, 4) || currentYear);
    const [month, setMonth] = useState(data?.calYm?.substr(4, 2) || currentMonth.toString().padStart(2, "0"));
    const [title, setTitle] = useState(data.title || "");
    const [contents, setContents] = useState(data.contents || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

    const handleSelectBox = (value: string) => {
        setSelectBox(false);
        setDataGubun(value)
    }

    const handleInputChange = (e: any) => {
        if(e.target.type==="text") setTitle(e.target.value);
        else if(e.target.type==="textarea") setContents(e.target.value);
    };

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
        }
    }, []);

    const queryClient = useQueryClient();

    const mutation = useMutation({        
        mutationFn: (e:any) => {
            e.preventDefault();
            const formData = new FormData();
            if(selectedFile) {
                formData.append("file", selectedFile);
            }
            formData.append("sawonCode", me.user.sawonCode || "");
            formData.append("upchaSeq", data.upchaSeq || "");
            formData.append("dataGubun", dataGubun);
            formData.append("year", year);
            formData.append("month", month);
            formData.append("title", title);
            formData.append("contents", contents);
            return fetch(`/api/pc/upload-write`, {
                method: 'post',
                credentials: 'include',
                body: formData,
            });
        },
        async onSuccess() {   
            queryClient.invalidateQueries({ queryKey: ["posts", "search", {}] });
            router.back();
        },
    });

    const handleSubmit = useCallback(async (e: any) => {
        if(title===undefined || title==="") {
            alert("제목을 입력해주세요.");
        } else if(contents===undefined || contents==="") {
            alert("내용을 입력해주세요.");
        } else if(!selectedFile) {
            alert("첨부파일을 선택해주세요.");
        } else {
            mutation.mutate(e);
        }
    }, [dataGubun, title, contents, year, month, selectedFile]);

    const handleClose = () => {
        router.back();
    }


    return <div className={style.contents}>
        { modify ? (
        <div className={style.write_form}>
            <div className={style.input_div}>
                <label className={style.input_label}>구분</label>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox} onClick={() => setSelectBox(!selectBox)}>{dataCode.find((item) => item.code===dataGubun)?.title}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {dataCode.map((item, index) => (
                            <li key={index} onClick={() => handleSelectBox(item.code)}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox2} onClick={() => setSelectBox2(!selectBox2)}>{year}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {Array.from({ length: currentYear - 2019 }, (_, index) => currentYear - index).map((item) => (
                            <li key={item} onClick={() => { setSelectBox2(false); setYear(item); }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox3} onClick={() => setSelectBox3(!selectBox3)}>{month}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, "0")).map((item) => (
                            <li key={item} onClick={() => { setSelectBox3(false); setMonth(item); }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>제목</label>
                <input type="text" className={style.input_title} value={title || ""} onChange={handleInputChange} />
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>내용</label>
                <textarea className={style.textarea} value={contents} onChange={handleInputChange}></textarea>
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>파일첨부</label>
                <input type="file" onChange={handleFileChange} />
            </div>
        </div>
        ) : (            
        <div className={style.write_form}>
            <div className={style.input_div}>
                <label className={style.input_label}>제목</label>
                {data?.title}
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>내용</label>
                {data?.contents}
            </div>
        </div>                    
        )}
        { modify ? (
        <div className={style.btn_wrap}>
            <button type="button" className={style.submit} onClick={handleSubmit}>완료</button>
            <button type="button" className={style.cancel} onClick={() => { if(data?.bnSeq) setModify(false); else handleClose(); }}>취소</button>
        </div>
        ) : ( 
        <div className={style.btn_wrap}>
            <button type="button" className={style.list} onClick={handleClose}>목록</button>
            <button type="button" className={style.modify} onClick={() => setModify(true)}>수정</button>
            <button type="button" className={style.cancel} onClick={handleClose}>취소</button>
        </div>    
        )}
    </div>
}