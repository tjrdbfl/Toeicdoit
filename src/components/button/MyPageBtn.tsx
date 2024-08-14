'use client';

import Link from "next/link";

const MyPageBtn=({label}:{
    label:string
})=>{

    return(<>
    <Link
    href={'?modify=true'}
    className={`text-[14px] bg-white text-center border-slate-100 border-2 shadow-md rounded-lg py-2`}
    >
        <p
        className=""
        >{label}</p>
        </Link>
    </>);
}
export default MyPageBtn;