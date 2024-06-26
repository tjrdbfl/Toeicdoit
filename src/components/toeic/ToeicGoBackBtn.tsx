import { PG } from "@/constants/enums/PG";
import Link from "next/link";

const ToeicGoBackBtn=()=>{
    return(<>
     <Link
    href={`${PG.LEVEL}`}
    className="lime_button w-[300px] justify-center p-5"
    >
        <p className="text-black font-semibold text-2xl">응시 전으로 돌아가기</p>
    </Link>
    </>);
}
export default ToeicGoBackBtn;