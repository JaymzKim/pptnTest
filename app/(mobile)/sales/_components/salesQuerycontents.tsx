import { Suspense } from "react";
import Loading from "./loading";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import SalesList from "./salesList";
import { getSales } from "../_lib/getSales";


export default async function SalesQueryContents({ sawonCode }: { sawonCode: number }) {
    
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["member", "sales", sawonCode],
        queryFn: getSales,
        initialPageParam: 0,
    })
    const dehydratedState = dehydrate(queryClient);
    return <>
    <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydratedState}>                    
            <SalesList sawonCode={sawonCode} />
        </HydrationBoundary>
    </Suspense>
    </>

}