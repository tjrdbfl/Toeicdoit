"use client";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FC, MutableRefObject } from 'react';

interface ScrollLeftBtnProps {
    scrollRef: MutableRefObject<HTMLUListElement  | null>;
}
const ScrollLeftBtn:FC<ScrollLeftBtnProps> = ({scrollRef}) => {
    
    const moveLeft=()=>{
        const {current}=scrollRef;

        if (current) {
            current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    }
    return (<>
        <button
        onClick={moveLeft}
        className='bg-white opacity-65 border-slate-100 border-2 shadow-lg rounded-full p-7 h-[50px] w-[50px] flex items-center justify-center hover:bg-blue-50'
        >
            <ArrowBackIosNewIcon className='text-[var(--blue2)] text-4xl' />
        </button>
    </>);
}
export default ScrollLeftBtn;