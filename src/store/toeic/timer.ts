import {create} from 'zustand';

interface TimerState{
    timeElapsed:number;
    isRunning:boolean;
    isPaused:boolean;
    startTime:number|null;
    timeLeft:number;
    totalTime:number;
    startTimer:(initialTime?:number)=>void;
    pauseTimer:()=>void;
    resumeTimer:()=>void;
    resetTimer:(initialTime?: number) => void;
}
export const useTimerStore=create<TimerState>((set)=>({
    timeElapsed:0,
    isRunning:false,
    startTime:null,
    isPaused:false,
    timeLeft:0,
    totalTime:0,
    startTimer:(initialTime?:number) => 
        set((state)=>({
            isRunning:true,
            startTime:Date.now(),
            timeLeft:initialTime ?? initialTime,
            totalTime:initialTime?? initialTime,
        })),
    pauseTimer:()=>
        set((state)=>({
            isPaused:true,
            timeElapsed:state.timeElapsed,
            timeLeft:state.timeLeft
        })),
    resumeTimer:()=>
        set((state)=>({
            isPaused:false,
        })),
    resetTimer:(initialTime?:number)=>
        set({
            timeElapsed:0,
            isRunning:false,
            startTime:null,
            timeLeft:initialTime?? 120*60*1000
        })
}))