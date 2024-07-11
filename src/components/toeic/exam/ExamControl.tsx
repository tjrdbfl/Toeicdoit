import { useTimerStore } from "@/store/toeic/timer";
import ExamTimer from "./ExamTimer";
import ToeicPlayer from "../ToeicPlayer";
import ExamPlayer from "./ExamPlayer";
import { useNumberOfQuestionStore } from "@/store/chat/exam/store";

const ExamControl = () => {
    const { pauseTimer, resumeTimer } = useTimerStore();
    const {count}=useNumberOfQuestionStore();

    return (<>
        <div className='flex flex-row bg-blue-50 shadow-lg rounded-2xl justify-center items-center w-full p-2'>
            <div className="w-[1000px] flex flex-row justify-between items-center">
                <div className='flex flex-row gap-x-3'>
                    <div className='flex flex-row gap-x-2 mt-3'>
                        <p className='text-black text-start font-semibold text-lg'>응시 문항 :</p>
                        <p className='text-blue-600 font-semibold text-xl'>{count}</p>
                        <p className='text-black font-semibold text-xl'>/ 200문항</p>
                    </div>
                    <div className='flex flex-row gap-x-2 mt-3'>
                        <p className='text-black text-start font-semibold text-lg'>남은시간 :</p>
                        <ExamTimer />
                        <p className='text-black font-semibold text-xl'>/ 120분</p>
                    </div>
                    <ExamPlayer sound={""} />
                </div>
                <div className='flex flex-row gap-x-2'>
                    <div className='w-[80px]'>
                        <button
                            className=' w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[17px] hover:bg-zinc-800'
                            onClick={() => {
                                resumeTimer();
                            }}
                        >다시 풀기</button>
                    </div>
                    <div className='w-[80px]'>
                        <button
                            className='w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[17px] hover:bg-zinc-800'
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
export default ExamControl;