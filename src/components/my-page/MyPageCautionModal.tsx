'use client';

import { IEvent, OptionType } from "@/types/TransactionData";
import { Dispatch, SetStateAction, useEffect } from "react";

const MyPageCautionModal=({
    event,option,setOpen,deleteEvent    
}:{
    event:IEvent[],
    option:OptionType,
    deleteEvent(): void,
    setOpen:Dispatch<SetStateAction<boolean>>,   
})=>{
    
    const message=option.message.split('||');
    
    console.log('option.id: '+JSON.stringify(option.id));
    console.log(JSON.stringify(event));
    
    return(<>
    <dialog
    className="fixed inset-0 z-40 flex justify-center items-center"
    >
        <div className="bg-white w-[400px] h-auto shadow-lg py-3 px-5 border-slate-100 border-2">
            {message.map((msg)=>(
                <p 
                key={msg.indexOf(msg)}
                className="text-black font-medium text-md text-pretty">{msg}</p>
            ))}
            <div className="flex flex-row gap-x-3 justify-end mt-3">
                <button
                onClick={()=>setOpen(false)}
                className="text-blue-500 text-md hover:bg-blue-50 rounded-full p-2"
                >
                    <p>취소</p>
                </button>
                <button
                onClick={()=>{
                    setOpen(false);
                    deleteEvent(); 
                }}
                className="text-blue-500 text-md hover:bg-blue-50 rounded-full p-2"
                >
                    <p>{option.title}</p>
                </button>
            </div>
        </div>
    </dialog>
    </>);
}
export default MyPageCautionModal;