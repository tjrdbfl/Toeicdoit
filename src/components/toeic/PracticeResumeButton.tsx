'use client';
import { usePracticeTimerStore } from "@/store/toeic/timer";

const PracticeResumeButton=()=>{
        const { resumeTimer } = usePracticeTimerStore();
        return(<>
        <button
                className=" w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[15px] hover:bg-zinc-800"
                onClick={() => {
                  resumeTimer();
                }}
              >
                다시 풀기
              </button>
        </>);
}
export default PracticeResumeButton;