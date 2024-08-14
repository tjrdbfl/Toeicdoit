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
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse, I_ApiBoardResponse } from "@/types/BoardData";
import ChatIcon from '@mui/icons-material/Chat';
import { cookies } from "next/headers";


export const metadata = {
    title: "Toeicdoit - Free Page",
    description: "",
};
export default async function FreeDetailPage({ params }: {
    params: {
        id: number;
    }
}) {

    let totalPages: number = 0;
    let notices: BoardData = {
        id: 0,
        title: "",
        content: "",
        userId: 0,
        writerName: "",
        type: "notice",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    let totalElements: number = 0;
    const name = cookies().get('name')?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/public/${SERVER_API.BOARD}/findBy?type=free&page=${params.id}&size=1`, {
            method: 'GET',
            headers: CommonHeader,
            next: { revalidate: 60 * 60 }
        });

        const data: I_ApiBoardResponse = await response.json();

        if (data) {
            notices = data.content[0];
            totalPages = data.totalPages;
            totalElements = data.totalElements;
            
            console.log('totalElements: '+totalElements);

        } else {
            console.error('Failed to get response data by find-by-types' + ERROR.SERVER_ERROR);
        }


    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }


    return (<>
        <div className="px-20 lg:px-40 py-20">
            <div className="px-80 mb-5">
            <FreeLink label={""} />
            </div>
            <div className="w-full flex flex-col z-10 px-10 lg:px-20 2xl:px-[25%]">
                <div className="mt-5" />
                <BoardDetailTitle
                    type={"free"}
                    title={notices.title}
                    category={notices.category || ''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={notices.writerName}
                    createdAt={notices.createdAt}
                    updatedAt={notices.updatedAt} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailContent content={notices.content} />
                <BoardDetailControl id={Number(params.id)} type={"free"} totalElements={totalElements}/>

                <div className="mt-16" />
                <div className='flex flex-row items-center gap-x-3'>
                    <ChatIcon className='text-[#F9F07A] text-2xl' />
                    <p className="text-black text-[18px] font-medium">댓글</p>
                </div>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardWriteReply name={name || ''} boardId={notices.id} page={Number(params.id) || 0} />
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />

                {notices.replyIds?.reverse().map((reply, index) => (
                    <BoardDetailReply
                        key={index}
                        writer={reply.writerName || ''}
                        content={reply.content}
                        create={new Date().toISOString().slice(0, 10)}
                        id={reply.id}
                        boardId={reply.boardId}
                        index={index}
                        update={false} />
                ))}
            </div>
        </div>
    </>);
}