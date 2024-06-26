'use server';

import { getCategoryColor } from "@/lib/utils/style";
import { BoardDataPublic } from "@/types/BoardData";
import BoardBody from "./BoardBody";

const BoardTable = async ({ notices,type }: { notices: BoardDataPublic[],type:number }) => {

    return (<>
        <div className="mt-10 flow-root">
            <div className="inline-block min-w-full align-middle shadow-md">
                <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">
                    <div className="md:hidden">
                        {notices?.map((item) => (
                            <div
                                key={item.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.title}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">

                                </div>
                            </div>
                        ))}
                    </div>

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2 min-w-full">
                            <tr className="flex w-full flex-row justify-between">
                                <th scope="col" className="2xl:w-[5%] lg:w-[10%] py-4 font-medium sm:pl-6 text-center ">
                                    번호
                                </th>
                                <th scope="col" className="w-[40%] py-4 font-medium text-center">
                                    제목
                                </th>
                                <th scope="col" className="w-[10%] py-4 font-medium text-center">
                                    작성자
                                </th>
                                <th scope="col" className="w-[20%] py-4 font-medium text-center ">
                                    작성날짜
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white rounded-2xl w-full flex justify-between">
                        <BoardBody
                                    key={1}
                                    id={1}
                                    type={type}
                                >
                                    <td className="whitespace-nowrap 2xl:w-[5%] lg:w-[10%] md:w-[12%] text-center">
                                        {1}
                                    </td>
                                    <td className="whitespace-nowrap w-[40%] text-center">
                                        <div className="flex flex-row gap-x-5 items-center justify-start">
                                            <p className={getCategoryColor(1)}>업데이트</p>
                                            <p>문의 드려요~</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap w-[10%] text-center">
                                        글쓴이
                                    </td>
                                    <td className="whitespace-nowrap w-[20%] text-center">
                                        {/* {notice.update} */}
                                    </td>

                                </BoardBody>
                            {notices?.map((notice) => (
                                <BoardBody
                                    key={notice.id}
                                    id={notice.id}
                                    type={type}
                                >
                                    <td className="whitespace-nowrap w-[5%] text-center">
                                        {notice.id}
                                    </td>
                                    <td className="whitespace-nowrap w-[40%] text-center">
                                        <div className="flex flex-row gap-x-5 items-center justify-start">
                                            <p className={getCategoryColor(notice?.category?.id || 1)}>{notice?.category?.category}</p>
                                            <p className="text-ellipsis">{notice.title}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap w-[10%] text-center">
                                        {notice.writer}
                                    </td>
                                    <td className="whitespace-nowrap w-[20%] text-center">
                                        {/* {notice.update} */}
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