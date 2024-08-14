import ExamAnswer from "@/components/exam/ExamAnswer";
import ToeicControl from "@/components/toeic/ToeicControl";
import ToeicHeader from "@/components/toeic/ToeicHeader";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import ExamContainer from "@/templates/toeic/ExamContainer";
import { ToeicProblemData } from "@/types/ToeicData";
import { cookies } from "next/headers";

export default async function ExamIdPage({ params }: { params: { id: number } }) {

    let toeic: ToeicProblemData=[{
        id: 0,
        sound: "",
        title: "",
        toeicIds: [],
        numberOfQuestions: 0,
        testType: ""
    }];

    try {
        const accessToken=cookies().get('accessToken')?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_TOEIC_API_URL}/api/${SERVER_API.TOEIC}/exam?id=${1}`, {
            method: 'GET',
            headers: AuthorizeHeader(accessToken),
            cache: 'no-store'
        })

        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json() as ToeicProblemData;
            toeic = data;
        }
        else {
            throw new Error(ERROR.SERVER_ERROR);
        }
    } catch (err) {
        throw new Error(ERROR.SERVER_ERROR);
    }


    return (
        <>
            <div className="fixed top-0 w-full">
                <ToeicHeader label={`토익두잇 실전 모의고사`} />
            </div>
            <div className="fixed top-10 w-full">
                <ToeicControl sound={toeic[0].sound} numberOfQuestions={200} type={"exam"} />
            </div>

            <div className="flex items-start mt-24 px-5 xl:px-10 2xl:px-[25%] bg-zinc-100">
                <div className="flex flex-col w-[650px] ">
                    <ExamContainer toeicIds={toeic[0].toeicIds} />
                </div>

            </div>
            <div className="mt-20" />
            <ExamAnswer toeicId={Number(params.id)}/>
        </>
    );
}
