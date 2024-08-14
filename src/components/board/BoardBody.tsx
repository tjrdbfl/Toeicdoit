'use client';
import { PG } from "@/constants/enums/PG";
import { useRouter } from "next/navigation";

const BoardBody = ({ children,id,type,modify}: {
    children: React.ReactNode,
    id: number,
    type:string,
    modify?:boolean,
}) => {

    const router=useRouter();
    return (<>
        <tr
            key={id}
            className="w-full flex flex-row justify-between border-b py-2 text-[14px] rounded-2xl hover:bg-slate-50"
            onClick={()=>{
                router.push(`${modify ? `${PG.INQUIRY_DETAILS}/modify`:type==='free'? PG.FREE : PG.NOTICE}/${id}`)}}
        >
            {children}
        </tr>
    </>);
}
export default BoardBody;