'use client';
import { formattedTime } from "@/service/utils/date";
import { useExamTimerStore, usePracticeTimerStore } from "@/store/toeic/timer"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ToeicTimer = () => {
    const { timeElapsed,startTimer,resetTimer, isRunning,isPaused } = usePracticeTimerStore();

    const INTERVAL = 1000;
    
    useEffect(() => {
        startTimer(0);
        
        return () => {
          resetTimer();
        };
      }, []);

      useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;
    
        if (!isPaused && isRunning) {
          timerId = setInterval(() => {
            usePracticeTimerStore.setState((state) => ({
              timeElapsed: state.timeElapsed + INTERVAL,
            }));
          }, INTERVAL);
        }
    
        return () => {
          if (timerId) {
            clearInterval(timerId);
          }
        };
      }, [isRunning, isPaused]); // Only re-run when isRunning or isPaused changes
    

    
    return (<>
        <span className="text-blue-600 text-lg font-semibold">
            {formattedTime(timeElapsed)}
        </span>
    </>);
}
export default ToeicTimer;