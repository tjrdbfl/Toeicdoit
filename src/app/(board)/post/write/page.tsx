import PostLink from "@/components/board/PostLink";
import LinkIcon from "@/components/common/LinkIcon";
import PostForm from "@/templates/board/PostForm";

export default async function PostWritePage() {
   

    return (<>
        <div className="total_padding py-28">
            <div className="w-full flex flex-col z-10 px-[7%]">
                <PostLink label={"글쓰기"} />
                <div className="mt-10" />
                <div className="flex items-center justify-center">
                    <div className="form w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-[2%]">
                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-medium text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
                                자유게시판 글쓰기
                            </h1>    
                        </div>
                        <div className="mt-10"/>
                        <PostForm/>
                    </div>
                </div>
            </div>
        </div>
    </>);
}