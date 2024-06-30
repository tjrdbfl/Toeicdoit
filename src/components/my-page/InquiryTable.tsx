'use client';
import { getCategoryColor, getTypeColor } from "@/lib/utils/style";
import { BoardData} from "@/types/BoardData";
import ModifyBtn from "../button/ModifyBtn";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { deletePost } from "@/service/post/action";
import { deleteCookie, getCookie } from "cookies-next";

const InquiryTable = ({
    boards
}: {
    boards: BoardData[]
}) => {

    const [category, setCategory] = useState<string>('');
    const [selectedId, setSelectedId] = useState<number>(0);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setCategory(event.target.value);
    };

    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSelectedId(parseInt(event.target.value));
    };


    //필터링 해서 보여주기
    const filteredNotices = boards.filter((board) => {
        return !category || board.category === category; // Filter by category or show all
    });

    const clickDelete=async()=>{
        try{
            const response=await deletePost(selectedId,'customer');

            if(!response.ok){
                alert('삭제 실패');
            }
    
        }catch(err){
            alert("Network Error: 삭제 실패");
            console.error("Error deleting post:", err); 
        }
        
    }

    return (<>
        <div>
            <div className="flex flex-row justify-end gap-x-2">
                <div className="w-[80px]">
                    <button 
                        className="form_submit_btn"
                        onClick={clickDelete}
                        >
                        삭제
                    </button>
                </div>
                <div className="w-[80px]">
                    <ModifyBtn id={selectedId} />
                </div>
            </div>

            <div className="flow-root mt-4">
                <div className="inline-block min-w-full align-middle shadow-md">
                    <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">
                        <table className="md:hidden">
                            <thead className="flex flex-row justify-between rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                                <tr className="flex w-full flex-row justify-between text-black">
                                    <th scope="col" className="lg:ml-8 xl:ml-10 2xl:ml-20 w-[20%] 2xl:w-[7%] lg:w-[10%] py-4 font-medium sm:pl-6 text-center ">
                                        번호
                                    </th>
                                    <th scope="col" className="md:ml-10 xl:ml-8 2xl:ml-0 lg:w-[14%] xl:w-[12%] 2xl:w-[10%] flex items-center">
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

                                    <th scope="col" className="w-[40%] py-4 font-medium text-center">
                                        제목
                                    </th>
                                    <th scope="col" className="w-[20%] py-4 font-medium text-center ">
                                        작성날짜
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                                <tr className="flex w-full flex-row justify-between">
                                    <th scope="col" className="lg:ml-8 xl:ml-10 2xl:ml-20 w-[15%] 2xl:w-[7%] lg:w-[10%] py-4 font-medium sm:pl-6 text-center ">
                                        번호
                                    </th>
                                    <th scope="col" className="md:ml-10 xl:ml-8 2xl:ml-0 lg:w-[14%] xl:w-[12%] 2xl:w-[10%] flex items-center">
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

                                    <th scope="col" className="w-[40%] py-4 font-medium text-center">
                                        제목
                                    </th>
                                    <th scope="col" className="w-[20%] py-4 font-medium text-center ">
                                        작성날짜
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white rounded-2xl w-full flex flex-col justify-between items-center">
                                <tr
                                    key={2}
                                    className="w-full items-center flex flex-row justify-between border-b py-3 text-lg rounded-2xl hover:bg-slate-50"
                                >
                                    <td className="whitespace-nowrap text-center ml-2 mt-2">
                                        <input
                                            id="boardId"
                                            type="radio"
                                            value={2}
                                            name={"boardId"}
                                            onChange={handleIdChange}
                                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    </td>
                                    <td
                                        className="whitespace-nowrap 2xl:w-[2%] lg:w-[10%] md:w-[12%] text-start">
                                        {1222}
                                    </td>
                                    <td className="whitespace-nowrap 2xl:w-[5%] lg:w-[10%] md:w-[12%] text-center">
                                        <p className={getTypeColor('1대1 문의')}>1대1 문의</p>
                                    </td>
                                    <td className="whitespace-nowrap w-[40%] text-center">
                                        <div className="flex flex-row gap-x-5 items-center justify-start">
                                            <p className={getCategoryColor('공부법')}>공부법</p>
                                            <p>문의 드려요~</p>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap w-[20%] text-center">
                                        {/* {notice.update} */}
                                    </td>

                                </tr>

                            </tbody>


                        </table>

                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default InquiryTable;