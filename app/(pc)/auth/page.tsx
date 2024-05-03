import { auth } from "@/auth";
import style from "@/styles/pc.module.css";
import Footer from "../../components/footer";
import PcHeader from "@/app/(pc)/_components/header";
import AuthList from "./_components/auth-list";

export const metadata = {
    title: "계정관리",
};

export default async function authPage({ searchParams }: { searchParams: any }) {  
    const session = await auth();
    const userData = JSON.parse(JSON.stringify(session));
    return <div id="wrap" className="pc_wrap">
        <PcHeader me={userData} />
        <div className={style.list_wrap}>
            <div className={style.list_title}>
                <h5 className={style.title}>계정관리</h5>
            </div>
            <AuthList searchParams={searchParams} />
        </div>
        <Footer />
    </div>
}