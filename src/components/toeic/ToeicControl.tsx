"use client";
import { useExamTimerStore, usePracticeTimerStore } from "@/store/toeic/timer";

import { useNumberOfQuestionStore } from "@/store/toeic/store";
import ExamPlayer from "../exam/ExamPlayer";
import ToeicTimer from "./ToeicTimer";
import ExamTimer from "../exam/ExamTimer";
import PracticeResumeButton from "./PracticeResumeButton";
import ExamResumeButton from "./ExamResumeButton";
import PracticePauseButton from "./PracticePauseButton";
import ExamPauseButton from "./ExamPauseButton";

const ToeicControl = ({
  type,
  sound,
  numberOfQuestions,
}: {
  type: "practice" | "exam";
  sound: string;
  numberOfQuestions: number;
}) => {
  const { count } = useNumberOfQuestionStore();

  return (
    <>
      <div className="flex flex-row bg-blue-50 shadow-lg justify-center items-center w-full px-5 py-1">
        <div className="w-[1000px] flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-3">
            <div className="flex flex-row gap-x-2 mt-2">
              <p className="text-black text-start font-semibold text-[16px]">
                응시 문항 :
              </p>
              <p className="text-blue-600 font-semibold text-[16px]">{count}</p>
              <p className="text-black font-semibold text-[16px]">
                / {numberOfQuestions}문항
              </p>
            </div>
            <div className="flex flex-row gap-x-2 mt-2">
              {type === "practice" ? (
                <p className="text-black text-start font-semibold text-[16px]">
                  풀이시간 :
                </p>
              ) : (
                <p className="text-black text-start font-semibold text-[16px]">
                  남은시간 :
                </p>
              )}
              {type === "practice" ? (
                <ToeicTimer />
              ) : (
                <div className="flex flex-row gap-x-2">
                  <ExamTimer />
                  <p className="text-black font-semibold text-[16px]">/ 120분</p>
                </div>
              )}
            </div>
            <ExamPlayer sound={sound} />
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="w-[80px]">
              {type==='practice'? <PracticeResumeButton/>:<ExamResumeButton/>}
            </div>
            <div className="w-[80px]">
            {type==='practice'? <PracticePauseButton/>:<ExamPauseButton/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ToeicControl;
