import BoardDetailContent from "@/components/board/BoardDetailContent";
import BoardDetailControl from "@/components/board/BoardDetailControl";
import BoardDetailProfile from "@/components/board/BoardDetailProfile";
import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import NoticeLink from "@/components/board/NoticeLink";
import { CommonHeader } from "@/config/headers";
import { I_ApiBoardDetailRequest, BoardDetail, I_ApiBoardDetailResponse } from "@/types/BoardData";

export const metadata = {
    title: "Toeicdoit - Board Page",
    description: "",
};

export default async function BoardDetailPage({ params }: {
    params: {
        id: number;
    }
}) {

    const payload: I_ApiBoardDetailRequest = { id: params.id }
    let Board: BoardDetail = {
        id: 0,
        title: "",
        writer: "",
        content: "",
        create: new Date(),
        update: new Date(),
    };

    let totalIndex: number = 0;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/getDetail`, {
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
            Board = data.Board;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data', data.message);
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
                    categoryId={Board?.category?.id || 1}
                    title={Board?.title}
                    category={Board?.category?.category || ''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailProfile
                    writer={Board.writer}
                    create={Board.create}
                    update={Board.update} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <BoardDetailContent content={Board.content} />
                <BoardDetailControl id={params.id} totalIndex={totalIndex}/>
            </div>
        </div>
    </>);
}