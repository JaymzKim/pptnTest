import { ReactNode } from "react";
import RQProvider from "./components/RQProvider";

type Props = { children: ReactNode, modal: ReactNode };
export default function PcLayout({ children, modal }: Props) {
    return (
        <RQProvider>
            {children}
            {modal}
        </RQProvider>
    )
}