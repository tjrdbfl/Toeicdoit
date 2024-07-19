"use client";
import { PG } from "@/constants/enums/PG"
import Link from "next/link"

export const GettingStartedBtn = ({isSticky}:{isSticky:boolean}) => {
    return (
        <>
            <Link href={`${PG.LOGIN}`}
                className={`${isSticky===true? 'text-[var(--blue2)] font-semibold hover:text-[#00A9FF] text-lg flex items-center':'h-[45px] flex justify-center items-center text-white font-semibold text-[15px] lg:text-[16px] bg-[var(--blue2)] hover:bg-[#00A9FF] rounded-lg px-5 py-[5px] mt-[3px] text-center'} `}>
                토익두잇 시작하기
            </Link>
        </>);
}