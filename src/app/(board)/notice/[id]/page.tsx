'use server';
import BoardDetailContent from "@/components/board/BoardDetailContent";
import BoardDetailControl from "@/components/board/BoardDetailControl";
import BoardDetailProfile from "@/components/board/BoardDetailProfile";
import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import NoticeLink from "@/components/board/NoticeLink";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { BoardData, I_ApiBoardDetailResponse } from "@/types/BoardData";


export default async function NoticeDetailPage({ params }: {
    params: {
        id: number;
    }
}) {
    
    
    let Board: BoardData = {
        id: 0,
        type: '공지',
        title: "",
        userId:0,
        writerName:'',
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
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
        <div className="px-28 py-20">
            <div className="w-full flex flex-col lg:px-20 2xl:px-[25%]">
                <NoticeLink />
                <div className="mt-8" />
                <BoardDetailTitle
                    type={"notice"}
                    title={Board?.title}
                    category={Board?.category || ''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={Board?.writerName}
                    createdAt={Board?.createdAt}
                    updatedAt={Board?.updatedAt} />

                <div className="bg-zinc-300 w-full h-[0.5px] mt-3" />
                <BoardDetailContent content={Board?.content} />
                <BoardDetailControl id={params.id}/>
            </div>
        </div>
    </>);
}