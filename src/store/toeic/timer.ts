'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ExamTimerState {
    timeElapsed: number;
    isRunning: boolean;
    isPaused: boolean;
    startTime: number | null;
    timeLeft: number;
    totalTime: number;
    startTimer: (initialTime?: number) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    resetTimer: (initialTime?: number) => void;
}
export const useExamTimerStore = create<ExamTimerState>()(persist(
    (set) => ({
        timeElapsed: 0,
        isRunning: false,
        startTime: null,
        isPaused: false,
        timeLeft: 0,
        totalTime: 0,
        startTimer: (initialTime?: number) =>
            set((state) => ({
                isRunning: true,
                startTime: Date.now(),
                timeElapsed: 0,
                timeLeft: initialTime ?? initialTime,
                totalTime: initialTime ?? initialTime,
            })),
        pauseTimer: () =>
            set((state) => ({
                isPaused: true,
                timeElapsed: state.timeElapsed,
                timeLeft: state.timeLeft
            })),
        resumeTimer: () =>
            set((state) => ({
                isPaused: false,
            })),
        resetTimer: (initialTime?: number) =>
            set({
                isRunning: false,
                startTime: null,
                timeLeft: initialTime ?? 120 * 60 * 1000
            })
    })
    , {
        name: 'ExamTimerStorage',
        storage: createJSONStorage(() => sessionStorage),
    }
)
);

export const usePracticeTimerStore = create<ExamTimerState>()(persist(
    (set) => ({
        timeElapsed: 0,
        isRunning: false,
        startTime: null,
        isPaused: false,
        timeLeft: 0,
        totalTime: 0,
        startTimer: (initialTime?: number) =>
            set((state) => ({
                isRunning: true,
                startTime: Date.now(),
                timeElapsed: 0
            })),
        pauseTimer: () =>
            set((state) => ({
                isPaused: true,
                timeElapsed: state.timeElapsed,
            })),
        resetTimer: () =>
            set((state) => ({
                isPaused: false,
            })),
        resumeTimer: (initialTime?: number) =>
            set({
                isRunning: true,
                isPaused:false,
                startTime: null,
            })
    }),
    {
        name: 'PracticeTimerStorage',
        storage: createJSONStorage(() => sessionStorage),
    }
))