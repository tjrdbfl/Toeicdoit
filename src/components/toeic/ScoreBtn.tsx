"use client";

import Link from "next/link";

const ScoreBtn=({label,url}:{label:string,url:string})=>{

    return(<>
    <Link
    href={`${url}`}
    className="lime_button w-[300px] justify-center p-5"
    >
        <p className="text-black font-semibold text-2xl">{label}</p>
    </Link>
    </>);
}
export default ScoreBtn;