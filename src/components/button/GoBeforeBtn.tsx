'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

const GoBeforeBtn=()=>{
    const router=useRouter();
    return(<>
    <button 
    onClick={()=>router.back()}
    className="form_submit_btn p-5 text-balance"
    >
        이전으로 돌아가기
    </button>
    </>);
}
export default GoBeforeBtn;