import Footer from "@/app/components/footer";
import MobileHeader from "../components/header";
import style from "@/styles/mobile.module.css";
import memberStyle from "@/styles/mobile-member.module.css";
import MemberSearchFilter from "../components/member-search-filter";
import MemberList from "../components/member-list";
import MemberSortingBox from "../components/member-sorting-box";
import { fetchItems } from "../components/fetch-items";
import { auth } from "@/auth";
import LoadMore from "../components/load-more";

export const metadata = {
    title: "회원관리",
};
export default async function MemberPage() {
    const session = await auth();
    const userData = JSON.parse(JSON.stringify(session));
    //const items = await fetchItems(1, userData.user.sawonCode, {product_type: "", search: "", sorting: ""});
    return <div id="wrap">
        <MobileHeader />
            <div className={style.mobile_wrap}>
                <MemberSearchFilter />
                <div className={memberStyle.member_list_wrap}>
                    <MemberSortingBox sawonCode={userData.user.sawonCode} />
                    <div className={memberStyle.list_contents}>
                        <LoadMore sawonCode={userData.user.sawonCode} />              
                    </div>
                </div>
            </div>
    </div>
}