import ExamAnswer from "@/components/exam/ExamAnswer";
import ToeicControl from "@/components/toeic/ToeicControl";
import ToeicHeader from "@/components/toeic/ToeicHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import ExamContainer from "@/templates/toeic/ExamContainer";
import { ToeicDataPublic, I_ApiLevelTestResponse } from "@/types/ToeicData";

export default function ExamIdPage({ params }: { params: { id: number } }) {
    
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
        numberOfQuestions: 200
    };

    async function getExamQuestion(){
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.TOEIC}`, {
                method: 'GET',
                headers: CommonHeader,
                cache: 'no-store'
            })
            const data: I_ApiLevelTestResponse = await response.json();
    
            if (data) {
                toeic = data.questions;
            } else {
                console.error('Failed to get response data' + ERROR.SERVER_ERROR);
            }
        } catch (err) {
            console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
        }
    }
 
    return (
    <>
      <div className="fixed top-0 w-full">
        <ToeicHeader label={`토익두잇 실전 모의고사`} />
      </div>
      <div className="fixed top-10 w-full">
      <ToeicControl sound={toeic.sound} numberOfQuestions={toeic.numberOfQuestions} type={"exam"} />
      </div>
      
      <div className="flex items-start mt-24 px-5 xl:px-10 2xl:px-[25%] bg-zinc-100">
            <div className="flex flex-col w-[650px]">
            <ExamContainer id={params.id} />
            </div>
            
        </div>
        <div className="mt-20"/>
            <ExamAnswer/>
    </>
  );
}
