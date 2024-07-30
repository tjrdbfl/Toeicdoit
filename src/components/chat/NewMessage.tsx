'use client';
import { useChatAlertStore, useChatNewMessageStore } from "@/store/chat/store";
import { RefObject, useEffect } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const NewMessage=({ref}:{
    ref: RefObject<HTMLDivElement> | null
})=>{

    const { fadeOut } = useChatNewMessageStore();
    
    const handleScroll=()=>{
        if(ref===null){
            return;
        }
        else if(ref?.current){
            ref.current.scrollTo({top:ref.current?.scrollHeight,behavior:'smooth'})
        }
      
    }
    return(fadeOut && <dialog className="z-10 flex justify-center bg-transparent">
        <button 
        onClick={()=>{handleScroll}}
        className={`flex-row rounded-full mx-10 py-2 px-5 flex items-center justify-center bg-blue-50 text-center text-pretty`}>
            <p className="text-black">새 매세지</p>
            <ArrowDownwardIcon className="text-black"/>
        </button>
    </dialog>);
}
export default NewMessage;