'use client';

import { PG } from "@/constants/enums/PG";
import { useRouter } from "next/navigation";

const ReturnToBtn = () => {
    const router = useRouter();
    return (
        <button
            onClick={() =>router.push(`${PG.INQUIRY_DETAILS}`)}
            className={`go_btn shadow-md rounded-xl border-slate-100 border-2 z-10'} flex flex-row px-2 justify-center items-center w-[70px] h-[40px]`}
        >
            목록
        </button>)
}
export default ReturnToBtn;