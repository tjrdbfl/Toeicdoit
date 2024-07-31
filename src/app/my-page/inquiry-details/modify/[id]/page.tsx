'use server';
import FreeLink from "@/components/board/FreeLink";
import SubmitButton from "@/components/button/SubmitBtn";
import LinkIcon from "@/components/common/LinkIcon";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import FreeModifyForm from "@/templates/board/FreeModifyForm";
import { BoardData, I_ApiBoardDetailRequest, I_ApiBoardDetailResponse } from "@/types/BoardData";

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
        type: "자유",
        writer: ""
    };

    let totalIndex: number = 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/detail?id=${params.id}`, {
            method: 'GET',
            headers: CommonHeader,
            next: { revalidate: 60 * 60 }
        })

        const data = await response.json();

        if (data) {
            board = data;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data: ' + ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR)
    }


    return (<>
    <div className="px-20 lg:px-52">
      <div className="mt-5 lg:mt-20" />
      <nav className="flex justify-between mb-3 border-b-2 border-violet-100 p-4">
        <MyPageHeader label={`${board.type === '자유' ? '자유게시판' : '1대1 문의'} 수정하기`} />
      </nav>
      <FreeModifyForm post={board} />
    </div>
        
    </>);
}