import ReturnToBtn from "@/components/button/ReturnToBtn";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import FreeModifyForm from "@/templates/board/FreeModifyForm";
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse } from "@/types/BoardData";
import { MessageData } from "@/types/MessengerData";
import { cookies } from "next/headers";

export default async function BoardModifyPage({ params }: {
    params: { id: number }
}) {

    let board: BoardData = {
        id: 0,
        title: "",
        userId: 0,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        type: "free",
        writerName: ""
    };


    try {
        const accessToken = cookies().get('accessToken')?.value;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.BOARD}/find-by-id?id=${params.id}`, {
            method: 'GET',
            headers: AuthorizeHeader(accessToken),
            next: { revalidate: 60 * 60 }
        })

       
        const result:MessageData = await response.json();
        const data=result.data as BoardData;

        if (data) {
            board = data;
        } else {
            console.error('Failed to get response data: ' + ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR)
    }


    return (<>
        <div className="px-20 lg:px-52">
            <div className="mt-5 lg:mt-20" />
            <div className="flex flex-row mb-3 border-b-2 border-zinc-100">
            <nav className="flex justify-between  w-full p-4">
                <MyPageHeader label={`${board.type === 'free' ? '자유게시판' : '1대1 문의'} 수정하기`} />
            </nav>
                <div className="w-full flex justify-end mt-2">
                    <ReturnToBtn />
                </div>
            </div>
            <FreeModifyForm post={board} />
        </div>

    </>);
}