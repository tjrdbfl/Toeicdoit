'use client';
import { useRouter } from "next/navigation";

const BoardBody = ({ children, id,type }: {
    children: React.ReactNode,
    id: number,
    type:string,
}) => {

    const router=useRouter();

    return (<>
        <tr
            key={id}
            className="w-full flex flex-row justify-between border-b py-3 text-lg rounded-2xl hover:bg-slate-50"
            onClick={()=>router.push(`${type==='notice'? '/notice': 'post'}/${id}`)}
        >
            {children}
        </tr>
    </>);
}
export default BoardBody;