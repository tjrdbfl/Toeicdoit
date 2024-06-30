import BoardDetailContent from "@/components/board/BoardDetailContent";
import BoardDetailControl from "@/components/board/BoardDetailControl";
import BoardDetailProfile from "@/components/board/BoardDetailProfile";
import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import NoticeLink from "@/components/board/NoticeLink";
import { CommonHeader } from "@/config/headers";
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse } from "@/types/BoardData";

export const metadata = {
    title: "Toeicdoit - Notice Page",
    description: "",
};

export default async function NoticeDetailPage({ params }: {
    params: {
        id: number;
    }
}) {

    const payload: I_ApiBoardDetailRequest = { id: params.id,type:'notice' }
    let Board: BoardData = {
        id: 0,
        type: 'notice',
        title: "",
        writer: "",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    let totalIndex: number = 0;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/detail`, {
            method: 'GET',
            headers:CommonHeader,
            body: JSON.stringify(payload),
            next: { revalidate: 60 * 60 }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch notice detail');
        }

        const data: I_ApiBoardDetailResponse = await response.json();

        if (data && data.success) {
            Board = data.Board;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data');
        }
    } catch (err) {
        console.log('Failed to get notice: ', err)
    }

    return (<>
        <div className="total_padding py-28">
            <div className="w-full flex flex-col z-10 px-[7%]">
                <NoticeLink />
                <div className="mt-10" />
                <BoardDetailTitle
                    type={"notice"}
                    title={Board?.title}
                    category={Board?.category || ''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={Board.writer}
                    createdAt={Board.createdAt}
                    updatedAt={Board.updatedAt} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailContent content={Board.content} />
                <BoardDetailControl id={params.id} totalIndex={totalIndex}/>
            </div>
        </div>
    </>);
}