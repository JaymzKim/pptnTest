import Footer from "@/app/components/footer";
import MobileHeader from "../components/header";
import style from "@/styles/mobile.module.css";
import SalesProductSummary from "./_components/salesProductSummary";
import { auth } from "@/auth";
import SalesPerformanceSummary from "./_components/salesPerformanceSummary";
import RQProvider from "../_components/RQProvider";
import SalesQueryContents from "./_components/salesQuerycontents";

export const metadata = {
    title: "매출내역",
};
export default async function SalesPage() {
    const session = await auth();
    const userData = JSON.parse(JSON.stringify(session));
    
    return <RQProvider>
        <div id="wrap">
            <MobileHeader />
                <div className={style.mobile_wrap}>
                    <SalesProductSummary sawonCode={userData.user.sawonCode} />
                    <SalesPerformanceSummary sawonCode={userData.user.sawonCode} />
                    <SalesQueryContents sawonCode={userData.user.sawonCode} />
                </div>
            <Footer />
        </div>
    </RQProvider>
}