import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type ExamTakeStore={
    exams:{id:number,take:boolean}[]
}
export const useExamTakeStore = create<ExamTakeStore>()(persist(
    (set) => ({
      exams:[]
    })
    , {
        name: 'ExamTakeStore',
        storage: createJSONStorage(() => localStorage),
    }
)
);
