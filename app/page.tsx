import { auth } from "@/auth";
import PcLayout from "./(pc)/layout";
import MobileHome from "./(mobile)/mobile-home";
import { redirect } from "next/navigation";

export default async function Home() {
  //const router = useRouter();
  const session = await auth();
  const getdata = JSON.parse(JSON.stringify(session));
  //console.log("ffffff",getdata.user);
  redirect(`/${getdata.user.sosok==="직원" ? "notice" : "member"}`);
  //router.replace(`/${getdata.user.sosok==="직원" ? "notice" : "member"}`);
  //return getdata.user.sosok==="직원" ? <PcLayout /> : <MobileHome userData={getdata.user} />
}