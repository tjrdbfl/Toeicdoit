"use client";

import { PG } from "@/constants/enums/PG";
import Link from "next/link";

const ExplanationBtn=({level}:{level:number})=>{

    return(<>
    <Link
    href={`${PG.LEVEL}/${level}`}
    className="lime_button w-[300px] justify-center p-5"
    >
        <p className="text-black font-semibold text-2xl">오답 하러 가기</p>
    </Link>
    </>);
}
export default ExplanationBtn;