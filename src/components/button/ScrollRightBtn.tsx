"use client";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FC, MutableRefObject } from 'react';

interface ScrollRightBtnProps {
    scrollRef: MutableRefObject<HTMLUListElement  | null>;
}
const ScrollRightBtn:FC<ScrollRightBtnProps> = ({scrollRef}) => {
   
    const moveRight=()=>{
        const {current}=scrollRef;
        if(current){
            current.scrollBy({left:300,behavior:'smooth'});
        }
    }
   
   return (<>
        <button
        onClick={moveRight}
        className='bg-white opacity-65 border-slate-100 border-2 shadow-lg rounded-full p-7 h-[50px] w-[50px] flex items-center justify-center hover:bg-blue-50'
        >
            <ArrowForwardIosIcon className='text-[var(--blue2)] text-4xl' />
        </button>
    </>);
}
export default ScrollRightBtn;