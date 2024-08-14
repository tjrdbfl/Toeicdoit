'use server';
import BoardBody from "./BoardBody";
import { BoardData } from "@/types/BoardData";


const BoardTable = async ({
    boards, type,totalElements,page
}: {
    boards: BoardData[],
    type: string,
    totalElements:number,
    page:number
}) => {
   
    return (<>
        <div className="mt-10 flow-root">
            <div className="inline-block min-w-full align-middle shadow-md">
                <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">

                    <table className="min-w-full text-gray-900">
                        <thead className="rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                            <tr className="flex w-full flex-row justify-between">
                                <th scope="col" className="w-[15%] 2xl:w-[5%] lg:w-[10%] py-2 font-medium sm:pl-6 text-center text-[14px]">
                                    번호
                                </th>
                                <th scope="col" className="w-[40%] py-2 font-medium text-center text-[14px]">
                                    제목
                                </th>
                                <th scope="col" className="w-[15%] py-2 font-medium text-center text-[14px]">
                                    작성자
                                </th>
                                <th scope="col" className="w-[20%] py-2 font-medium text-center text-[14px]">
                                    작성날짜
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white rounded-2xl w-full flex flex-col justify-between">
                            {boards?.map((notice, index, arr) => (
                                <BoardBody
                                    key={notice.id}
                                    id={(10*(page-1))+index}
                                    type={type}
                                >
                                    <td className=" whitespace-nowrap w-[17%] 2xl:w-[8%] md:w-[16%] lg:w-[14%] text-center">
                                        {totalElements-(10*(page-1))-index}
                                    </td>
                                    <td className="whitespace-nowrap  sm:w-[36%]  text-center">
                                        <div className="flex flex-row gap-x-5 items-center justify-start">
                                            {type==='free' ? <p className={`${notice.category === '시험 후기' ? "text-blue-500 font-medium" :
                                                notice.category == '자료 공유' ? "text-purple-500 font-medium" :
                                                    "text-green-500 font-medium"}`}>{notice.category}</p>
                                            :<>
                                            <p className={`${notice.category === '이벤트' ? "text-blue-500 font-medium" :
                                                notice.category == '공지' ? "text-purple-500 font-medium" :
                                                    "text-green-500 font-medium"}`}>{notice.category}</p>
                                            </>}
                                            <p className="hidden text-ellipsis md:table">{notice.title}</p>
                                            <div className="md:hidden">
                                                <p className="text-ellipsis">{notice.title.slice(0, 6) + '...'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap w-[10%] text-center ">
                                        {notice.writerName}
                                    </td>
                                    <td className=" whitespace-nowrap w-[20%] text-center">
                                        {new Date(notice.updatedAt).toISOString().slice(0, 10)}
                                    </td>

                                </BoardBody>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}
export default BoardTable;