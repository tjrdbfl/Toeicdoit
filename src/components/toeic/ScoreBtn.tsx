"use client";

import Link from "next/link";

const ScoreBtn=({label,url}:{label:string,url:string})=>{

    return(<>
    <Link
    href={`${url}`}
    className="lime_button w-[230px] justify-center p-3"
    >
        <p className="text-black font-semibold">{label}</p>
    </Link>
    </>);
}
export default ScoreBtn;