'use server';
import CustomPagination from "@/components/common/CustomPagination";
import PracticeAnswer from "@/components/toeic/PracticeAnswer";
import QuestionCard from "@/components/toeic/QuestionCard";
import ToeicControl from "@/components/toeic/ToeicControl";
import ToeicHeader from "@/components/toeic/ToeicHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { I_ApiLevelTestResponse, ToeicDataPublic } from "@/types/ToeicData";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default async function LevelPracticePage({ params }: {
    params: {
        id: number;
        page?: string;
    }
}) {
    const currentPage = Number(params.page) || 1;
    let totalPages: number = 10;

    let toeic: ToeicDataPublic = {
        id: 0,
        question: "",
        part: 0,
        image: "",
        sound: "",
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        take: false,
        answer: "",
        description: "",
        script: "",
        numberOfQuestions: 20
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.TOEIC}/find-types?page=${currentPage - 1}&size=1`, {
            method: 'GET',
            headers: CommonHeader,
            cache: 'no-store'
        })
        const data: I_ApiLevelTestResponse = await response.json();

        if (data) {
            totalPages = data.totalPages || 0;
            toeic = data.questions;
        } else {
            console.error('Failed to get response data' + ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }

    return (<>
        <div className="total_padding">
            <ToeicHeader label={`토익두잇 레벨 ${params.id} 연습문제 `} />
        </div>
        <ToeicControl sound={toeic.sound} numberOfQuestions={toeic.numberOfQuestions} />
        <div className="flex flex-row items-start justify-center gap-x-16 mt-10">
            <div className="px:px-[10%] md:w-[350px] lg:px-[23%] lg:w-[800px] xl:px-[25%] xl:w-[900px] 2xl:px-[27%] 2xl:w-[900px] flex flex-col mt-5">
                <div className="flex flex-row w-full gap-x-5 justify-between">
                    <div className="flex flex-col">
                        <QuestionCard
                            id={Number(params.page)}
                            toeic={toeic} />
                        <div className="mt-10 flex w-full justify-start">
                            <CustomPagination totalPages={10} type={"single"} />
                        </div>
                        <Link 
                        href={PG.LEVEL}
                        className="mt-20 text-blue-500 underline text-lg w-[200px] font-semibold hover:text-blue-400 flex flex-row gap-x-2"
                        >
                        <ArrowBackIcon className="text-lg"/>
                        이전으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-20"/>
            <PracticeAnswer
                id={params.id}
                part={toeic.part}
                label={`Level ${params.id}`}
                count={toeic.numberOfQuestions} />

        </div>
    </>);
}