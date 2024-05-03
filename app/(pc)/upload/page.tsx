import { auth } from "@/auth";
import style from "@/styles/pc.module.css";
import Footer from "../../components/footer";
import PcHeader from "../components/header";
import UploadList from "./_components/upload-list";

export const metadata = {
    title: "자료업로드",
};

export default async function UploadPage({ searchParams }: { searchParams: any }) {    
    const session = await auth();
    const userData = JSON.parse(JSON.stringify(session));
    return <div id="wrap" className="pc_wrap">
        <PcHeader me={userData} />
        <div className={style.list_wrap}>
            <div className={style.list_title}>
                <h5 className={style.title}>자료업로드</h5>
            </div>
            <UploadList searchParams={searchParams} />
        </div>
        <Footer />
    </div>
}