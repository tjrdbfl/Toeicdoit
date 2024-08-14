'use client';
import { BoardData } from "@/types/BoardData";
import { ChangeEvent, useEffect, useState } from "react";
import BoardBody from "../board/BoardBody";
import { findByBoard } from "@/service/board/actions";
import CustomPagination from "../common/CustomPagination";


const InquiryTable = ({
    page
}: {
    page:number,
}) => {

    console.log('page: '+page);
    const [type, setType] = useState('all');
    const [boardArray,setBoardArray]=useState<BoardData[]>([]);
    const [totalElements,setTotalElements]=useState<number>(0);
    const [totalPages,setTotalPages]=useState<number>(0);

    const handleTypeChange = async(event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setType(event.target.value);
    };

    const handleGetBoard=async()=>{
        const response=await findByBoard(page,type);
        console.log('handleTypeChange: '+JSON.stringify(response));       

        if(response.status===200){
            setBoardArray(response.data?.boards||[]);
            setTotalElements(response.data?.totalElements||0);
            setTotalPages(response.data?.totalPages||0);
        }
    }

    useEffect(()=>{
        handleGetBoard();
        console.log('useEffect: '+totalElements);
    },[type]);

    return (<>
    <div className="flow-root">
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
                                            name="type"
                                            id="type"
                                            className="block font-semibold"
                                            onChange={handleTypeChange}
                                        >
                                            <option value="all">문의 유형</option>
                                            <option value="free">자유게시판</option>
                                            <option value="request">1대1 문의</option>
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
                                            name="type"
                                            id="type"
                                            className="block font-semibold"
                                            onChange={handleTypeChange}
                                        >
                                            <option value="all">문의 유형</option>
                                            <option value="free">자유게시판</option>
                                            <option value="request">1대1 문의</option>
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
                                {boardArray?.map((board,index) => (
                                    <BoardBody
                                        key={board.id} 
                                        id={board.id} 
                                        type={board.type}
                                        modify={true}                                        
                                    >
                                        <td
                                            className="whitespace-nowrap 2xl:w-[9%] lg:w-[10%] md:w-[19%] text-center 2xl:ml-10">
                                             {totalElements-(10*(page-1))-index}
                                        </td>
                                        <td className="mr-5 whitespace-nowrap 2xl:w-[5%] lg:w-[10%] md:w-[20%] text-center">
                                            <p className={`${board.type === 'request' ? "text-red-500 font-medium" :
                                                board.type == 'free' ? "text-yellow-500 font-medium" :
                                                    "text-zinc-500 font-medium"}`}>{board.type==='request' ? '1대1 문의':'자유게시판'}</p>
                                        </td>
                                        <td className="whitespace-nowrap w-[45%] text-center">
                                            <div className="flex flex-row gap-x-5 items-center justify-start">
                                                {board.type === 'free'? 
                                                <p className={`${board.category === '이벤트' ? "text-blue-500 font-medium" :
                                                    board.category == '공지' ? "text-purple-500 font-medium" :
                                                        "text-green-500 font-medium"}`}>{board.category}</p>
                                                            :
                                                            <p className={`${board.category === '결제문의' ? "text-blue-500 font-medium" :
                                                                board.category === '시스템 에러' ? "text-purple-500 font-medium" :
                                                                    board.category === '학습 콘텐츠' ? "text-green-500 font-medium" :
                                                                        "text-black-500 font-medium"}`}>{board.category}</p>
                                                            
                                                            }
                                                <p>{board.title.slice(0,16)+'...'}</p>
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
            <div className="mt-5"/>
            <div className="flex w-full justify-center">
                <CustomPagination type='double' totalPages={totalPages} page={page} />
            </div>
    </>);
}
export default InquiryTable;