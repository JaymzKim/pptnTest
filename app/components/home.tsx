import { auth } from "@/auth";
import PcHome from "../(pc)/page";
import MobileHome from "../(mobile)/mobile-home";

export default async function Home({ searchParams }: { searchParams: any }) {
    const session = await auth();
    const getdata = JSON.parse(JSON.stringify(session));
    return getdata.user.sosok==="직원" ? <PcHome searchParams={searchParams} /> : <MobileHome userData={getdata.user} />
}