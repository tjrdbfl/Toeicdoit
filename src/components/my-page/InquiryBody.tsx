'use client';
import { PG } from "@/constants/enums/PG";
import { useRouter } from "next/navigation";

const InquiryBody = ({ children, id,boardId }: {
    children: React.ReactNode,boardId:number
    id: number,
}) => {

    const router = useRouter();
    return (<>
        <tr
            key={id} className={`border-b-slate-200  border-b-2 hover:bg-blue-50 w-full flex flex-row `}
            onClick={() => router.push(`${PG.INQUIRY_DETAILS}/modify/reply/${boardId}`)}
        >
            {children}
        </tr>
    </>);
}
export default InquiryBody;