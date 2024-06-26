'use client';
import { useRouter } from "next/navigation";

const InquiryBody = ({ children, id }: {
    children: React.ReactNode,
    id: number,
}) => {

    const router = useRouter();
  
    return (<>
        <tr
            onClick={() => { router.push(`/board/${id}`); }}
            key={id}
            className="datagrid_body_tr">
            {children}
        </tr>
    </>);
}
export default InquiryBody;