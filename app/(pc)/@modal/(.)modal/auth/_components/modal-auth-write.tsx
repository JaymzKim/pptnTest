import style from "@/styles/pc-modal.module.css";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJojikCenter } from "../_lib/getJojikCenter";
import { getCenterPart } from "../_lib/getCenterPart";
import { getJobCode } from "../_lib/getJobCode";
interface Item {
    data: any,
    status: string,
    message: string
}
export default function AuthWrite({ data, me, searchParams }: { data: any, me: any, searchParams?: any }) {
    
    
    const {data: jojikCenter, isLoading, error} = useQuery<Item, Object, Item, [_1: string]>({
        queryKey: ['jojikCenter'],
        queryFn: getJojikCenter,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    }) as any;

    
    const {data: jobCodeList} = useQuery<Item, Object, Item, [_1: string]>({
        queryKey: ['jobCode'],
        queryFn: getJobCode,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    }) as any;

    const [modify, setModify] = useState(data?.sawonCode ? false :true);
    const [selectBox, setSelectBox] = useState(false);
    const [selectBox2, setSelectBox2] = useState(false);
    const [selectBox3, setSelectBox3] = useState(false);
    const [centerCode, setCenterCode] = useState(data.jojikCode ? data.jojikCode : jojikCenter?.data[0].code);
    const [partCode, setPartCode] = useState<any | []>([]);
    const [jojikCode, setJojikCode] = useState(data.jojikCode ? data.jojikCode : 1);
    const [jobCode, setJobCode] = useState(data.jobCode ? data.jobCode : jobCodeList?.data[0].code);
    const [swId, setSwId] = useState(data?.swId || "");
    const [swPwd, setSwPwd] = useState(data?.swPwd || "");
    const [name, setName] = useState(data.name || "");
    const router = useRouter();

    const {data: centerPartData, isLoading: isCenterPartDataLoading} = useQuery<Item, Object, Item, [_1: string, _2: string]>({
        queryKey: ['centerPart', centerCode],
        queryFn: getCenterPart,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    }) as any;


    const handleSelectBox = (value: string) => {
        setSelectBox(false);
        setCenterCode(value);
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({        
        mutationFn: (e:any) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("sawonCode", data.sawonCode || "");
            formData.append("swId", swId || "");
            formData.append("swPwd", swPwd);
            formData.append("jojikCode", jojikCode);
            formData.append("name", name);
            return fetch(`/api/pc/auth-write`, {
                method: 'post',
                credentials: 'include',
                body: formData,
            });
        },
        async onSuccess() {   
            queryClient.invalidateQueries({ queryKey: ["posts", "search"] });
            router.back();
        },
    });

    const handleSubmit = useCallback(async (e: any) => {
        if(name===undefined || name==="") {
            alert("이름을 입력해주세요.");
        } else if(swId===undefined || swId==="") {
            alert("아이디를 입력해주세요.");
        } else if(swPwd===undefined || swPwd==="") {
            alert("비밀번호를 입력해주세요.");
        } else {
            mutation.mutate(e);
        }
    }, [centerCode, name, swId, swPwd]);
    
    const handleInputChange = (e: any) => {
        if(e.target.name==="name") setName(e.target.value);
        else if(e.target.name==="swId") setSwId(e.target.value);
        else if(e.target.name==="swPwd") setSwPwd(e.target.value);
    };

    const handleClose = () => {
        router.back();
    }
    useEffect(() => {
        setCenterCode(jojikCenter?.data[0].code);
        setPartCode(centerPartData?.data);
        console.log(centerPartData?.data);
    }, [jojikCenter]);
    useEffect(() => {
        if(!isCenterPartDataLoading && centerPartData?.data) {
            setPartCode(centerPartData?.data);
            setJojikCode(centerPartData?.data[0]?.code);
            console.log(centerPartData?.data);
        }
    }, [centerCode, isCenterPartDataLoading, centerPartData]);
    useEffect(() => {
        setJobCode(jobCodeList?.data[0]?.code);
    }, [jobCodeList]);
    return <div className={style.contents}>
        { modify ? (
        <div className={style.write_form}>
            <div className={style.input_div}>
                <label className={style.input_label}>이름</label>
                <input type="text" name="name" className={style.input_title} value={name || ""} onChange={handleInputChange} />
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>구분</label>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox} onClick={() => setSelectBox(!selectBox)}>{jojikCenter?.data.find((item: any) => item.code===centerCode)?.title}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {jojikCenter?.data.map((item: any, index: number) => (
                            <li key={index} onClick={() => handleSelectBox(item.code)}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox2} onClick={() => setSelectBox2(!selectBox2)}>{partCode?.find((item: any) => item.code===jojikCode)?.title}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {partCode && partCode?.map((item: any, index: number) => (
                            <li key={index} onClick={() => { setSelectBox2(false); setJojikCode(item.code); }}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={style.select_box}>
                    <button type="button" aria-selected={selectBox3} onClick={() => setSelectBox3(!selectBox3)}>{jobCodeList?.data.find((item: any) => item.code===jobCode)?.title}</button>
                    <div className={style.select_box_list}>
                        <ul>
                            {jobCodeList?.data.map((item: any, index: number) => (
                            <li key={index} onClick={() => { setSelectBox3(false); setJobCode(item.code); }}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>아이디</label>
                <input type="text" name="swId" className={style.input_title} value={swId || ""} onChange={handleInputChange} />
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>비밀번호</label>
                <input type="text" name="swPwd" className={style.input_title} value={swPwd || ""} onChange={handleInputChange} />
            </div>
        </div>
        ) : (            
        <div className={style.write_form}>
            <div className={style.input_div}>
                <label className={style.input_label}>아이디</label>
                {data?.swId}
            </div>
            <div className={style.input_div}>
                <label className={style.input_label}>비밀번호</label>
                {data?.swPwd}
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