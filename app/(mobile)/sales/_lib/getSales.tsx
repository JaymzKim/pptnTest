import { auth } from "@/auth";

type Props = { pageParam?: number, queryKey: any };
export async function getSales({pageParam, queryKey}: Props) {
    const [_1, _2, sawonCode] = queryKey;
    const res = await fetch(`/api/mobile/sales-list?page=${pageParam}&sawonCode=${queryKey[2]}`, {
        next: {
            tags: ["member", "sales"],
        },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return data;
}