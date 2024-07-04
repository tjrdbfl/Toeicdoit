'use client';

import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";
import { MyPageResult, MyPageResultContent } from "@/constants/my-page/datagrid";
import { useEffect, useState } from "react";


const ResultContainer = () => {

    const [selectedTab, setSelectedTab] = useState(MyPageResult[0].id);
    const [isClient, setIsClient] = useState(false);
    const [rowNumber, setRowNumber] = useState<number>(0);

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        console.log('selectedTab: ' + selectedTab);
        const filterData = MyPageResultContent.filter((item) => item.categoryId === selectedTab);
        setRowNumber(filterData.length);
    }, [selectedTab]);


    return (<>
        <nav className="w-full">
            <ul className="w-full flex flex-row gap-x-3">
                {MyPageResult.map((item) => {

                    return (
                        <li
                            key={item.id}
                            onClick={() => { setSelectedTab(item.id) }}
                            className={`${selectedTab === item.id ? 'bg-black text-white' : 'bg-white text-black'} shadow-md border-slate-100 border-2 font-medium  rounded-full w-auto h-[20px] p-3 hover:bg-slate-50 hover:text-black`}
                        >
                            {item.title}
                        </li>);
                }
                )}
            </ul>
        </nav>
        <div className="mt-10" />
        <div
            className="w-[500px] py-4 text-black flex flex-row border-slate-200 border-2 pr-10"
        >
            <p className="w-[10%] text-center font-medium">번호</p>
            <p className="w-[80%] text-center font-medium">풀이 날짜</p>
            <p className="w-[10%] text-start font-medium">점수</p>
        </div>
        {isClient &&
            <ScrollArea
                className="h-[300px] border-slate-200 border-8 w-[500px] "
            >
                <table
                    className="hidden text-gray-900 md:table w-[500px] border-slate-200 border-2 ">
                    <thead
                        className="sticky top-0 z-10"
                    >
                        <tr className="bg-white text-black ">

                        </tr>
                    </thead>
                    {rowNumber === 0 ?
                        <tbody className="flex flex-row items-center justify-center py-5">
                            <p className="text-blue-500 font-medium">문제 풀이 내역이 없습니다.</p>
                        </tbody>
                        :
                        <tbody
                            className=""
                        >
                            {MyPageResultContent.filter((item) => item.categoryId === selectedTab).map((item, index) => (
                                <tr
                                    key={item.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="w-[10%] text-center font-medium py-4">{index + 1}</td>
                                    <td className="w-[80%] text-center font-medium py-4">{item.date.toISOString().slice(0, 10)}</td>
                                    <td className="w-[10%] text-start text-blue-500 font-semibold py-4">{item.score}</td>
                                </tr>
                            ))}

                        </tbody>
                    }

                </table>
            </ScrollArea>

        }

    </>);
}
export default ResultContainer;