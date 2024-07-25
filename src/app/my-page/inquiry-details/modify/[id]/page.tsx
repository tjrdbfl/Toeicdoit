'use server';
import FreeLink from "@/components/board/FreeLink";
import SubmitButton from "@/components/button/SubmitBtn";
import LinkIcon from "@/components/common/LinkIcon";
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
        <div className="lg:mt-20">
            <div className="w-full flex flex-col z-10 px-32 lg:px-[7%]">
                <div className="flex items-center justify-center">
                    <div className="form w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-10 xl:mt-0">
                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-medium text-lg md:text-xl ">
                                {board.type === '자유' ? '자유게시판' : '1대1 문의'} 수정하기
                            </h1>
                        </div>
                        <FreeModifyForm post={board} />
                    </div>
                </div>
            </div>
        </div>
    </>);
}