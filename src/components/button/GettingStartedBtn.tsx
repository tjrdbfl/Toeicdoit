import { PG } from "@/constants/enums/PG"
import Link from "next/link"

export const GettingStartedBtn = ({isSticky}:{isSticky:boolean}) => {
    return (
        <>
            <Link href={`${PG.LOGIN}`}
                className={`${isSticky===true? 'text-[#5AB2FF] font-semibold hover:text-[#00A9FF] text-xl flex items-center':'h-[50px] flex justify-center items-center text-white font-semibold text-[18px] bg-[#5AB2FF] hover:bg-[#00A9FF] rounded-lg px-5 py-[5px] mt-[3px] text-center'} `}>
                토익두잇 시작하기
            </Link>
        </>);
}