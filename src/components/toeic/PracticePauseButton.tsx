'use client';
import { usePracticeTimerStore } from "@/store/toeic/timer";

const PracticePauseButton=()=>{
        const { pauseTimer } = usePracticeTimerStore();
        return(<>
        <button
                className=" w-full h-auto py-[2.5%] flex text-center items-center text-white shadow-xl rounded-lg bg-black justify-center text-[15px] hover:bg-zinc-800"
                onClick={() => {
                        pauseTimer();
                }}
              >
               일시 정지
              </button>
        </>);
}
export default PracticePauseButton;