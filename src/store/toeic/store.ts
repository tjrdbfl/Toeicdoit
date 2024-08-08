'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ResultStore = {
  name:string,
  type:string,
  BarData: number[],
  score: number,
  lc_score: number,
  rc_score: number,
  timeElapsed: number,
}
export const useResultStore = create<ResultStore>()(
  persist(
    (set) => ({
      name:'',
      type:'',
      BarData: [],
      score:0,
      lc_score:0,
      rc_score:0,
      timeElapsed:0,
    }),
    {
      name: 'toeic-result',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

type ExamCautionModalStore = {
  toggle: boolean;
  toggleModal: () => void
}
export const useExamCautionModalStore = create<ExamCautionModalStore>()((set) => ({
  toggle: false,
  toggleModal: () => set((state) => ({ toggle: !state.toggle }))
}));

type ExamRetakeModalStore = {
  show: boolean;
  setShow: () => void
}
export const useExamRetakeModalStore = create<ExamRetakeModalStore>()((set) => ({
  show: false,
  setShow: () => set((state) => ({ show: !state.show }))
}));

type NumberOfQuestionStore = {
  count: number;
  setCount: () => void;
}
export const useNumberOfQuestionStore = create<NumberOfQuestionStore>()((set) => ({
  count: 0,
  setCount: () => set((state) => ({ count: ++state.count }))
}))

interface ToeicAnswer {
  [key: number]: string;
}
type ToeicAnswerStore = {
  answers: ToeicAnswer[]
  setAnswer: (questionId: number, selectedAnswer: string) => void
}
export const useToeicAnswerStore = create<ToeicAnswerStore>()(
  persist(
    (set) => ({
      answers: [],
      setAnswer: (questionId, selectedAnswer) =>
        set((state) => {
          const updatedAnswers = [...state.answers];

          const existingAnswerIndex = updatedAnswers.findIndex((answer) => questionId in answer);
          if (existingAnswerIndex !== -1) {
            updatedAnswers[existingAnswerIndex][questionId] = selectedAnswer;
          } else {
            updatedAnswers.push({ [questionId]: selectedAnswer });
          }

          return { answers: updatedAnswers };
        }),
    }),
    {
      name: 'toeic-answers',
    }
  )
);