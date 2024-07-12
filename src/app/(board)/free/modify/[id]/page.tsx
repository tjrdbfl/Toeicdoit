import FreeLink from "@/components/board/FreeLink";
import LinkIcon from "@/components/common/LinkIcon";
import { CommonHeader } from "@/config/headers";
import { SERVER } from "@/constants/enums/API";
import FreeModifyForm from "@/templates/board/FreeModifyForm";
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse } from "@/types/BoardData";

export const metadata = {
    title: "Toeicdoit - Free Edit Page",
    description: "",
};
export default async function FreeEditPage({params}:{
    params:{id:number}
}){

    const payload: I_ApiBoardDetailRequest = { id: params.id,type:'post' };
    let board: BoardData = {
        id: 0,
        title: "",
        writer: "",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        type: "post"
    };

    let totalIndex: number = 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/board/detail`, {
            method: 'POST',
            headers:CommonHeader,
            body: JSON.stringify(payload),
            next: { revalidate: 60 * 60 }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch notice detail');
        }

        const data: I_ApiBoardDetailResponse = await response.json();

        if (data && data.success) {
            board = data.Board;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data');
        }
    } catch (err) {
        console.log('Failed to get notice: ', err)
    }


    return(<>
        <div className="total_padding py-28">
            <div className="w-full flex flex-col z-10 px-[7%]">
                <FreeLink label={"수정하기"} />
                <div className="mt-10" />
                <div className="flex items-center justify-center">
                    <div className="form w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-[2%]">
                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-medium text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
                                자유게시판 수정하기
                            </h1>    
                        </div>
                        <div className="mt-10"/>
                        {/* <FreeModifyForm post={board}/> */}
                    </div>
                </div>
            </div>
        </div>
    </>);
}