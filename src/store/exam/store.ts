import { create } from 'zustand';

type ExamCautionModalStore={
    toggle:boolean;
    toggleModal:()=>void
}
export const useExamCautionModalStore=create<ExamCautionModalStore>()((set)=>({
    toggle:false,
    toggleModal:()=>set((state)=>({toggle:!state.toggle}))
})); 
type ExamRetakeModalStore={
    show:boolean;
    setShow:()=>void
}
export const useExamRetakeModalStore=create<ExamRetakeModalStore>()((set)=>({
    show:false,
    setShow:()=>set((state)=>({show:!state.show}))
})); 
