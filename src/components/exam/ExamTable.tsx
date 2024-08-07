import { RealTestContent } from "@/constants/my-page/datagrid";
import { ITEMS_PER_PAGE, ToeicData } from "@/types/ToeicData";
import TakeBtn from "../button/TakeBtn";
import CompleteBtn from "../button/CompleteBtn";
import ExamBody from "./ExamBody";
import { CommonHeader } from "@/config/headers";

export default async function ExamTable({ query, currentPage }: {
    query: string,
    currentPage: number
}) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    let tests: ToeicData[] = [
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "2024년 상반기 TOEIC 1차 기출 모의고사",
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
        {
        id: 0,
        part: 0,
        level: 0,
        quesiton: "",
        answer: "",
        numberOfQuestions: 0,
        description: "",
        image: "",
        sound: "",
        script: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: `2024년 상반기 TOEIC 차 기출 모의고사`,
        take: true,
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        result: {
            id: 0,
            result: false,
            userAnswer: [],
            isCorrect: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
];


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/exam/search`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify({query: query,
                currentPage: currentPage,
                offset: offset}),
        })

        const data = await response.json();

        if (!data.success) {
            console.error('Failed to fetch exam data: ', data.message);
        }
        tests = data.toeicdata || [];
    } catch (err) {
        console.log('Failed to fetch /api/exam/search: ', err);
    }




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
                     
                            {tests?.map((content,index) => (
                                <ExamBody
                                    key={content.id}
                                    id={content.id}
                                >
                                    <td className="whitespace-nowrap py-1.5 pl-8 pr-2 text-[14px]">
                                        {index+1}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-1.5 text-[14px]">
                                        {`2024년 상반기 TOEIC ${index+1}차 기출 모의고사`}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-1.5 text-[14px]">
                                        {content.take ?
                                            <TakeBtn id={content.id} />
                                            : <CompleteBtn id={content.id} />}
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