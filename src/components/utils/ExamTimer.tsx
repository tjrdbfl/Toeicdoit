'use client';
import { useTimerStore } from "@/store/toeic/timer"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ExamTimer = () => {
    const router=useRouter();
    const { timeLeft, startTimer,resetTimer, isRunning,isPaused } = useTimerStore();

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
            useTimerStore.setState((state) => ({
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
          useTimerStore.setState({ isRunning: false }); // Explicitly stop the timer in the store
        }
      }, [timeLeft, isRunning]);

    const formattedTime = new Date(timeLeft).toISOString().slice(11, 19)    // 시간 형식 지정(hh:mm:ss) 
    return (<>
        <span className="text-blue-500 text-xl font-semibold">
            {formattedTime}
        </span>
    </>);
}
export default ExamTimer;