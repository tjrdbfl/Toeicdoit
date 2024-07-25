'use client';
import { BoardData } from "@/types/BoardData";
import { ChangeEvent, useEffect, useState } from "react";
import BoardBody from "../board/BoardBody";


const InquiryTable = ({
    boards
}: {
    boards: BoardData[]
}) => {

    
    const [category, setCategory] = useState<string>('');
    
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setCategory(event.target.value === '공지사항' ? '공지' : event.target.value === '자유게시판' ? '자유' : '문의');
    };

    
    let tempCategory: string = '이벤트';

    return (<>
    <div className="flow-root mt-4">
                <div className="inline-block min-w-full align-middle shadow-md">
                    <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">
                        <table className="md:hidden">
                            <thead className="flex flex-row justify-between rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                                <tr className="flex w-full flex-row justify-between text-black">
                                    <th scope="col" className="lg:ml-8 xl:ml-10 2xl:ml-20 w-[20%] 2xl:w-[7%] lg:w-[10%] py-2 font-medium sm:pl-6 text-center text-[14px]">
                                        번호
                                    </th>
                                    <th scope="col" className="md:ml-10 xl:ml-8 2xl:ml-0 lg:w-[14%] xl:w-[12%] 2xl:w-[10%] flex items-center text-[14px]">
                                        <select
                                            name="category"
                                            id="category"
                                            className="block font-semibold"
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">문의 유형</option>
                                            <option value="자유게시판">자유게시판</option>
                                            <option value="1대1 문의">1대1 문의</option>
                                        </select>
                                    </th>

                                    <th scope="col" className="w-[40%] py-2 font-medium text-center">
                                        제목
                                    </th>
                                    <th scope="col" className="w-[20%] py-2 font-medium text-center ">
                                        작성날짜
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                                <tr className="flex w-full flex-row justify-between">
                                    <th scope="col" className="lg:ml-8 xl:ml-10 w-[15%] 2xl:w-[7%] lg:w-[10%] py-2 font-medium sm:pl-6 text-center text-[14px]">
                                        번호
                                    </th>
                                    <th scope="col" className="md:ml-10 xl:ml-8 2xl:ml-0 lg:w-[14%] xl:w-[12%] 2xl:w-[10%] flex items-center text-[14px]">
                                        <select
                                            name="category"
                                            id="category"
                                            className="block font-semibold"
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">문의 유형</option>
                                            <option value="자유게시판">자유게시판</option>
                                            <option value="1대1 문의">1대1 문의</option>
                                        </select>
                                    </th>

                                    <th scope="col" className="text-[14px] w-[40%] py-2 font-medium text-center">
                                        제목
                                    </th>
                                    <th scope="col" className="text-[14px] w-[20%] py-2 font-medium text-center ">
                                        작성날짜
                                    </th>
                                </tr>
                            </thead>


                            <tbody className="bg-white rounded-2xl w-full flex flex-col justify-between items-center">
                                {boards?.map((board) => (
                                    <BoardBody
                                        key={board.id} 
                                        id={board.id} 
                                        type={board.type}
                                        modify={true}                                        
                                    >
                                        <td
                                            className="whitespace-nowrap 2xl:w-[9%] lg:w-[10%] md:w-[19%] text-center 2xl:ml-10">
                                            {board.id}
                                        </td>
                                        <td className="mr-5 whitespace-nowrap 2xl:w-[5%] lg:w-[10%] md:w-[12%] text-center">
                                            <p className={`${board.type === '문의' ? "text-red-500 font-medium" :
                                                board.type == '자유' ? "text-yellow-500 font-medium" :
                                                    "text-zinc-500 font-medium"}`}>{board.type}</p>
                                        </td>
                                        <td className="whitespace-nowrap w-[42%] text-center">
                                            <div className="flex flex-row gap-x-5 items-center justify-start">
                                                <p className={`${tempCategory === '이벤트' ? "text-blue-500 font-medium" :
                                                    tempCategory === '알림' ? "text-purple-500 font-medium" :
                                                        tempCategory === '업데이트' ? "text-green-500 font-medium" :
                                                            "text-black-500"}`}>{tempCategory}</p>
                                                <p>{board.title}</p>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap w-[20%] text-center">
                                            {new Date(board.updatedAt).toISOString().slice(0, 10)}
                                        </td>

                                    </BoardBody>

                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
    </>);
}
export default InquiryTable;