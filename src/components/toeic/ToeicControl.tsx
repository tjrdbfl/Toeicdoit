'use client';
import { useExamTimerStore, usePracticeTimerStore } from "@/store/toeic/timer";

import { useNumberOfQuestionStore } from "@/store/toeic/store";
import ExamPlayer from "../exam/ExamPlayer";
import ToeicTimer from "./ToeicTimer";


const ToeicControl = ({sound,numberOfQuestions}:{
    sound:string
    numberOfQuestions:number
}) => {
    const { pauseTimer, resumeTimer } = usePracticeTimerStore();
    const {count}=useNumberOfQuestionStore();


    return (<>
        <div className='flex flex-row bg-blue-50 shadow-lg rounded-2xl justify-center items-center w-full px-3 py-1'>
            <div className="w-[1000px] flex flex-row justify-between items-center">
                <div className='flex flex-row gap-x-3'>
                    <div className='flex flex-row gap-x-2 mt-2'>
                        <p className='text-black text-start font-semibold text-[16px]'>응시 문항 :</p>
                        <p className='text-blue-600 font-semibold text-[16px]'>{count}</p>
                        <p className='text-black font-semibold text-[16px]'>/ {numberOfQuestions}문항</p>
                    </div>
                    <div className='flex flex-row gap-x-2 mt-2'>
                        <p className='text-black text-start font-semibold text-[16px]'>풀이시간 :</p>
                        <ToeicTimer/>
                      </div>
                    <ExamPlayer sound={sound} />
                </div>
                <div className='flex flex-row gap-x-2'>
                    <div className='w-[80px]'>
                        <button
                            className=' w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[15px] hover:bg-zinc-800'
                            onClick={() => {
                                resumeTimer();
                            }}
                        >다시 풀기</button>
                    </div>
                    <div className='w-[80px]'>
                        <button
                            className='w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[15px] hover:bg-zinc-800'
                            onClick={() => {
                                pauseTimer();
                            }

                            }
                        >일시 정지</button>
                    </div>
                </div>
            </div>

        </div>
    </>);
}
export default ToeicControl;