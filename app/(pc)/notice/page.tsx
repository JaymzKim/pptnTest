import { auth } from "@/auth";
import Footer from "../../components/footer";
import PcHeader from "../components/header";
import NoticeList from "./_components/notice-list";
import style from "@/styles/pc.module.css";

export const metadata = {
    title: "공지관리",
};

export default async function PcHome({ searchParams }: { searchParams: any }) {    
    const session = await auth();
    const getdata = JSON.parse(JSON.stringify(session)) as any | [];
    console.log("fdsafd",getdata);
    return <div id="wrap" className="pc_wrap">
        <PcHeader me={getdata} />
        <div className={style.list_wrap}>
            <div className={style.list_title}>
                <h5 className={style.title}>공지관리</h5>
            </div>
            <NoticeList searchParams={searchParams} />
        </div>
        <Footer />
    </div>
}