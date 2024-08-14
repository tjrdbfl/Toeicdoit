import { RealTestContent } from "@/constants/my-page/datagrid";
import { ITEMS_PER_PAGE, ToeicData } from "@/types/ToeicData";
import TakeBtn from "../button/TakeBtn";
import CompleteBtn from "../button/CompleteBtn";
import ExamBody from "./ExamBody";
import { CommonHeader } from "@/config/headers";
import { getExamTitleId, getExamTitleYear, getTakeById } from "@/service/utils/utils";

export default async function ExamTable({ query, currentPage }: {
    query: string,
    currentPage: number
}) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    let tests: { id: number, title: string, take: boolean |undefined }[] = [
        {
            id: 10*(currentPage-1)+1,
            title: `${getExamTitleYear(10*(currentPage-1)+1)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+1)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+1)
        },
        {
            id: 10*(currentPage-1)+2,
            title: `${getExamTitleYear(10*(currentPage-1)+2)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+2)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+2)
        },
        {
            id: 10*(currentPage-1)+3,
            title: `${getExamTitleYear(10*(currentPage-1)+3)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+3)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+3)
        },
        {
            id: 10*(currentPage-1)+4,
            title: `${getExamTitleYear(10*(currentPage-1)+4)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+4)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+4)
        },
        {
            id: 10*(currentPage-1)+5,
            title: `${getExamTitleYear(10*(currentPage-1)+5)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+5)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+5)
        },
        {
            id: 10*(currentPage-1)+6,
            title: `${getExamTitleYear(10*(currentPage-1)+6)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+6)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+6)
        },
        {
            id: 10*(currentPage-1)+7,
            title: `${getExamTitleYear(10*(currentPage-1)+7)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+7)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+7)
        },
        {
            id: 10*(currentPage-1)+8,
            title: `${getExamTitleYear(10*(currentPage-1)+8)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+8)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+8)
        },
        {
            id: 10*(currentPage-1)+9,
            title: `${getExamTitleYear(10*(currentPage-1)+9)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+9)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+9)
        },
        {
            id: 10*(currentPage-1)+10,
            title: `${getExamTitleYear(10*(currentPage-1)+10)}년 상반기 TOEIC ${getExamTitleId(10*(currentPage-1)+10)}차 기출 모의고사`,
            take: getTakeById(10*(currentPage-1)+10)
        },
    ]

    return (<>
        <div className="mt-10 flow-root">
            <div className="inline-block min-w-full align-middle shadow-md">
                <div className="rounded-2xl border-slate-100 border-2 bg-white p-2 md:pt-0">

                    <table className="min-w-full text-gray-900">
                        <thead className="rounded-2xl bg-white text-left font-normal border-b-slate-200 border-b-2">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-medium sm:pl-6 text-[14px]">
                                    번호
                                </th>
                                <th scope="col" className="px-3 py-3 font-medium text-[14px]">
                                    기출 문제
                                </th>
                                <th scope="col" className="px-3 py-3 font-medium text-[14px]">
                                    응시 여부
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white rounded-2xl">

                            {tests?.map((content, index) => (
                                <ExamBody
                                    key={content.id}
                                    id={content.id}
                                >
                                    <td className="whitespace-nowrap py-1.5 pl-8 pr-2 text-[14px]">
                                        {content.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-1.5 text-[14px]">
                                        {content.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-1.5 text-[14px]">
                                        {content.take ?
                                            <CompleteBtn id={content.id} />
                                            :
                                            <TakeBtn id={content.id} />
                                            }
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