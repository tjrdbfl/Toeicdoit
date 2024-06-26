import { RealTestContent } from "@/constants/my-page/datagrid";
import { ITEMS_PER_PAGE, ToeicData } from "@/types/ToeicData";
import TakeBtn from "../button/TakeBtn";
import CompleteBtn from "../button/CompleteBtn";
import ExamBody from "./ExamBody";
import { I_ApiExamSearchRequest, I_ApiExamSearchResponse } from "@/app/api/exam/search/route";
import { CommonHeader } from "@/config/headers";

export default async function ExamTable({ query, currentPage }: {
    query: string,
    currentPage: number
}) {

    const offset=(currentPage-1)* ITEMS_PER_PAGE;

    let tests:ToeicData[]=[];

    const payload: I_ApiExamSearchRequest = {
        query: query,
        currentPage:currentPage,
        offset:offset
    };

    console.log(JSON.stringify(payload));
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/exam/search`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify(payload),
        })
    
        const data:I_ApiExamSearchResponse=await response.json();
    
        if(!data.success){
            console.error('Failed to fetch exam data: ',data.message);
        }
        tests=data.toeicdata||[];
    }catch(err){
        console.log('Failed to fetch /api/exam/search: ',err);
    }
    


   
    return (<>
        <div className="mt-10 flow-root">
            <div className="inline-block min-w-full align-middle shadow-md">
                <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">
                    <div className="md:hidden">
                        {tests?.map((item) => (
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
                        <thead className="rounded-2xl bg-white text-left text-lg font-normal border-b-slate-200 border-b-2">
                            <tr>
                                <th scope="col" className="px-4 py-4 font-medium sm:pl-6">
                                    번호
                                </th>
                                <th scope="col" className="px-3 py-4 font-medium">
                                    기출 문제
                                </th>
                                <th scope="col" className="px-3 py-4 font-medium">
                                    응시 여부
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white rounded-2xl">
                            {tests?.map((content) => (
                                <ExamBody
                                    key={content.id}
                                    id={content.id}
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {content.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {content.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {content.take ? 
                                        <TakeBtn id={content.id}/>
                                        : <CompleteBtn id={content.id}/>}
                                    </td>
                                </ExamBody>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);

} 