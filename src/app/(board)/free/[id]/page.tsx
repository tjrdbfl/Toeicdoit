import BoardDetailContent from "@/components/board/BoardDetailContent";
import BoardDetailControl from "@/components/board/BoardDetailControl";
import BoardDetailProfile from "@/components/board/BoardDetailProfile";
import BoardDetailReply from "@/components/board/BoardDetailReply";
import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import BoardWriteReply from "@/components/board/BoardWriteReply";
import FreeLink from "@/components/board/FreeLink";

import { CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse } from "@/types/BoardData";
import ChatIcon from '@mui/icons-material/Chat';


export const metadata = {
    title: "Toeicdoit - Free Page",
    description: "",
};
export default async function FreeDetailPage({ params }: {
    params: {
        id: number;
    }
}) {

    let Board: BoardData = {
        id: 0,
        title: "",
        content: "",
        userId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        type: "자유",
        writerName: ""
    };

    let totalIndex: number = 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-by-id?id=${params.id}`, {
            method: 'GET',
            headers:CommonHeader,
            next: { revalidate: 60 * 60 }
        })

        const data = await response.json();
        
        if (data) {
            Board = data;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data: '+ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR)
    }

    return (<>
        <div className="px-20 lg:px-40 py-20">
            <div className="w-full flex flex-col z-10 px-10 lg:px-20 2xl:px-[25%]">
                <FreeLink label={""} />
                <div className="mt-5" />
                <BoardDetailTitle
                    type={"post"}
                    title={Board?.title}
                    category={Board.category||''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={''}
                    createdAt={Board.createdAt}
                    updatedAt={Board.updatedAt} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailContent content={Board.content} />
                <BoardDetailControl id={params.id}/>

                <div className="mt-16" />
                <div className='flex flex-row items-center gap-x-3'>
                    <ChatIcon className='text-[#F9F07A] text-2xl' />
                    <p className="text-black text-[18px] font-medium">댓글</p>
                </div>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardWriteReply/>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />

                {Board.reply?.map((reply)=>(
                    <>
                    <BoardDetailReply writer={reply.writer || ''} content={Board.content} create={Board.createdAt} id={reply.id} />
                    </>            
                ))}
                <BoardDetailReply writer={"작성자"} content={Board.content} create={Board.createdAt} id={1} />
            </div>
        </div>
    </>);
}