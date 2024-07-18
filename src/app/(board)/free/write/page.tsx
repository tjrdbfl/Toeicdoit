import FreeLink from "@/components/board/FreeLink";
import LinkIcon from "@/components/common/LinkIcon";
import FreeSaveForm from "@/templates/board/FreeSaveForm";


export default async function FreeWritePage() {
   

    return (<>
        <div className="total_padding py-28">
            <div className="w-full flex flex-col z-10 lg:px-20 2xl:px-[20%]">
                <FreeLink label={"글쓰기"} />
                <div className="mt-10" />
                <div className="flex items-center justify-center">
                    <div className="form w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-[2%]">
                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-medium text-lg md:text-xl lg:text-2xl xl:text-3xl">
                                자유게시판 글쓰기
                            </h1>    
                        </div>
                        <div className="mt-10"/>
                        <FreeSaveForm/>
                    </div>
                </div>
            </div>
        </div>
    </>);
}