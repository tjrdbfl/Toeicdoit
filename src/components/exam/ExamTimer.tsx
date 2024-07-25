'use client';
import { formattedTime } from "@/service/utils/date";
import { useExamTimerStore } from "@/store/toeic/timer"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ExamTimer = () => {
    const router=useRouter();
    const { timeLeft, startTimer,resetTimer, isRunning,isPaused } = useExamTimerStore();

    const INTERVAL = 1000;
    
    useEffect(() => {
        // Start the timer when the component mounts and initialize state
        startTimer(120*60*1000);
        
        // Clean up when the component unmounts
        return () => {
          resetTimer();
        };
      }, []);

      useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;
    
        if (!isPaused && isRunning) {
          timerId = setInterval(() => {
            useExamTimerStore.setState((state) => ({
              timeElapsed: state.timeElapsed + INTERVAL,
              timeLeft: state.timeLeft - INTERVAL,
            }));
          }, INTERVAL);
        }
    
        return () => {
          if (timerId) {
            clearInterval(timerId);
          }
        };
      }, [isRunning, isPaused]); // Only re-run when isRunning or isPaused changes
    
      useEffect(() => {
        if (timeLeft <= 0 && isRunning) {
          console.log("Time is up!");
          router.push("/score");
          useExamTimerStore.setState({ isRunning: false }); // Explicitly stop the timer in the store
        }
      }, [timeLeft, isRunning]);

    
    return (<>
        <span className="text-blue-600 text-[16px] font-semibold">
            {formattedTime(timeLeft)}
        </span>
    </>);
}
export default ExamTimer;