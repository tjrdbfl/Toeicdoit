import Link from "next/link";

const StartLevelTestBtn=()=>{
    return(<>
    <div
    className="animate-slidein700 opacity-0 
    w-[350px] h-[90px]
    flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-3xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
    >
    <Link 
    href={"/level-test"}
    className="relative text-center items-center w-full h-full px-5 py-5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
    레벨 테스트 하러가기
    </Link>
    </div>
    </>);
}
export default StartLevelTestBtn;