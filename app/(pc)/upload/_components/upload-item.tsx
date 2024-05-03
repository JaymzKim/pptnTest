import style from "@/styles/pc.module.css";

export default function UploadItem({ item }: { item: any }) {
    return <tr>
        <td>{item.dataGubun}</td>
        <td className={style.title}>{item.title}</td>
        <td>{item.regDate}</td>
        <td>{item.name}</td>
    </tr>
}