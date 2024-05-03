import { auth } from "@/auth";
import { Item } from "@/lib/definitions";
import MemberItem from "./member-item";
import { MemberLoading } from "./member-loading";

export interface ItemProps {
    items: Item[] | null;
}

export default function MemberList({ items }: ItemProps) {
    return <>  
        {items ? (
            items.map((item: any) => (
            <MemberItem key={item.memSeq} data={item} />
            )) 
        ) : (
            <div>nodata</div>
        )}
    </>
}