import BoardDetailContent from "@/components/board/BoardDetailContent";
import BoardDetailControl from "@/components/board/BoardDetailControl";
import BoardDetailProfile from "@/components/board/BoardDetailProfile";
import BoardDetailReply from "@/components/board/BoardDetailReply";
import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import BoardWriteReply from "@/components/board/BoardWriteReply";
import FreeLink from "@/components/board/FreeLink";
import ReturnToBtn from "@/components/button/ReturnToBtn";

import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import ChatIcon from '@mui/icons-material/Chat';
import { cookies } from "next/headers";

export default async function ModifyReplyPage({ params }: {
    params: {
        id: number;
    }
}) {
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

    const userId=cookies().get('userId')?.value;
    const name=cookies().get('name')?.value;
    const accessToken=cookies().get('accessToken')?.value;

    if(name===undefined || accessToken===undefined){
        throw new Error(ERROR.INVALID_MEMBER);
    }

    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-by-id?id=${params.id}`, {
            method: 'GET',
            headers: AuthorizeHeader(accessToken),
            cache:'no-cache'
        });

        const data = await response.json();

        if (data.status===500) {
            throw new Error(ERROR.SERVER_ERROR);
 
        } else {
            notices=data;
        }

    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }

    return (<>
        <div className="mt-10 lg:mt-20">
            <div className="w-full flex flex-col z-10 px-10 xl:px-40">
                <div className="mt-5" />
                <BoardDetailTitle
                    type={"free"}
                    title={notices?.title||''}
                    category={notices?.category||''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={notices?.writerName}
                    createdAt={notices?.createdAt}
                    updatedAt={notices?.updatedAt} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailContent content={notices?.content} />
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <div className="w-full flex justify-end">
                <ReturnToBtn/>
                </div>

                
                <div className="mt-16" />
                <div className='flex flex-row items-center gap-x-3'>
                    <ChatIcon className='text-[#F9F07A] text-2xl' />
                    <p className="text-black text-[18px] font-medium">댓글</p>
                </div>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardWriteReply name={name||''} boardId={params.id} page={Number(params.id)||0}/>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />

                {notices?.replyIds?.reverse().filter((reply)=>reply.userId===Number(userId)).map((reply,index)=>(
                    <BoardDetailReply 
                    key={index}
                    writer={reply.writerName || ''} 
                    content={reply.content} 
                    create={new Date().toISOString().slice(0,10)} 
                    id={reply.id} 
                    index={index}
                    boardId={reply.boardId} 
                    update={true}/>          
                ))}
            </div>
        </div>
    </>);
}