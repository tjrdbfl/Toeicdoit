'use client';
import { classifyPart } from '@/service/toeic/items';
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

type ToeicAnswer = {
  id: number;
  answer: string;
};

type ToeicAnswerStore = {
  answers: ToeicAnswer[];
  setAnswer: (questionId: number, selectedAnswer: string) => void;
};

export const useToeicAnswerStore = create<ToeicAnswerStore>()(
  persist(
    (set) => ({
      answers: [], // 초기에는 빈 배열로 설정
      setAnswer: (questionId, selectedAnswer) =>
        set((state) => {
          // 필요한 경우 answers 배열의 크기를 늘립니다.
          while (state.answers.length <= questionId) {
            state.answers.push({ id: state.answers.length, answer: '' });
          }

          const existingAnswerIndex = state.answers.findIndex(
            (answer) => answer.id === questionId
          );

          if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...state.answers];
            updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
            return { answers: updatedAnswers };
          } else {
            return { answers: [...state.answers, { id: questionId, answer: selectedAnswer }] };
          }
        }),
    }),
    {
      name: 'toeic-answers',
    }
  )
);

type ExamAnswer = {
  toeicId: number;
  answer: string;
  part:number;
};

type ExamAnswerStore = {
  answers: ExamAnswer[];
  setAnswer: (questionId: number, selectedAnswer: string,part:number) => void;
};

export const useExamAnswerStore = create<ExamAnswerStore>()(
  persist(
    (set) => ({
      answers: Array.from({ length: 200 }, (_, index) => ({ 
        toeicId: index+1, 
        answer: '', 
        part: 0 
      })), // 초기에는 빈 배열로 설정
      setAnswer: (questionId, selectedAnswer,part) =>
        set((state) => {
          console.log('part: '+part);
        

          const existingAnswerIndex = state.answers.findIndex(
            (answer) => answer.toeicId === questionId
          );

          if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...state.answers];
            updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
            updatedAnswers[existingAnswerIndex].part=part;
            return { answers: updatedAnswers };
          } else {
            return { answers: [...state.answers, { toeicId: questionId, answer: selectedAnswer,part:part}] };
          }
        }),
    }),
    {
      name: 'ExamAnswerStore',
      storage: createJSONStorage(() => sessionStorage),
  
    }
  )
);