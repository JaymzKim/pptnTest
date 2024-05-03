import style from "@/styles/mobile.module.css";
import MobileHeader from "./components/header";
import HomeSummary from "./components/home-summary";
import Footer from "../components/footer";

export default function MobileHome({ userData }: { userData: any }) {
    return <div id="wrap">
        <MobileHeader />
        <div className={style.mobile_wrap}>
            <h5 className={style.user_name}><strong>{userData.name}</strong>님, 반갑습니다.</h5>
            <HomeSummary sawonCode={userData.sawonCode} />
        </div>
        <Footer />
    </div>
}