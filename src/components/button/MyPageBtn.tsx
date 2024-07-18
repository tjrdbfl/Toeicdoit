'use client';

import Link from "next/link";

const MyPageBtn=({label}:{
    label:string
})=>{

    return(<>
    <Link
    href={'?modify=true'}
    className={`bg-white border-slate-100 border-2 ring-offset-4 ring-slate-100 shadow-lg ring-2 rounded-xl p-3 hover:bg-slate-50 w-fit`}
    >
        <p
        className="text-black text-xl"
        >{label}</p>
        </Link>
    </>);
}
export default MyPageBtn;