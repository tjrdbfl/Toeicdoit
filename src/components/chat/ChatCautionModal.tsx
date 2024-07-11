'use client';

import { ChatOptionType } from "@/constants/chat/constant";
import { useChatAlertStore } from "@/store/chat/store";
import { ChatData } from "@/types/ChatData";
import { Dispatch, SetStateAction, useEffect } from "react";

const ChatCautionModal=({type,chat,option,setOpen}:{
    type:'block'|'drawer',
    chat?:ChatData,
    option:ChatOptionType,
    setOpen:Dispatch<SetStateAction<boolean>>
})=>{
    
    const message=option.message.split('||');

    return(<>
    <dialog
    className="fixed inset-0 z-40 flex mt-84 lg:mr-64"
    >
        <div className="bg-white w-[400px] h-auto shadow-lg py-3 px-5">
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
                    if(type==='block'){
                        useChatAlertStore.setState({
                            fadeOut:true,
                            message:chat?.senderName+`님이 채팅방을 나가셨습니다`,
                        });
                    }else if(type==='drawer' && option.id===1){
                        //api 통신

                    }

                   
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
export default ChatCautionModal;