import { PG } from "@/constants/enums/PG";
import Link from "next/link";
const StartLevelTestBtn=()=>{
    return(
    <Link
    href={`${PG.LEVEL_TEST}/test`}
    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg p-3 text-center me-2 mb-2">
    레벨 테스트 하러가기
    </Link>
    );
}
export default StartLevelTestBtn;