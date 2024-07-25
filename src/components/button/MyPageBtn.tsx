'use client';

import Link from "next/link";

const MyPageBtn=({label}:{
    label:string
})=>{

    return(<>
    <Link
    href={'?modify=true'}
    className={`user_info_btn`}
    >
        <p
        className=""
        >{label}</p>
        </Link>
    </>);
}
export default MyPageBtn;