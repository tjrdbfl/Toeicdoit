'use client';

import { ChatOptionType } from "@/constants/chat/constant";
import { useChatAlertStore } from "@/store/chat/store";
import { ChatData } from "@/types/ChatData";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ScrollArea } from "../utils/ScrollArea";
import Image from "next/image";

const ChatCautionModal=({type,chat,option,setOpen,sender,name,profile,admin,userData}:{
    type:'block'|'drawer',
    chat?:ChatData,
    option:ChatOptionType,
    setOpen:Dispatch<SetStateAction<boolean>>,
    sender?:string[],
    admin?:string[],
    name?:string,
    profile?:string,
    userData:{userId:string,name:string,profile:string}[]
})=>{
    
    const message=option.message.split('||');
    console.log('userData: '+userData);
    return(<>
    <dialog
    className="fixed inset-0 z-40 flex mt-84 lg:mr-64"
    >
        <div className={`${option.id===2? 'bg-blue-100 border-slate-200 border-2 shadow-lg w-[250px]':'w-[400px] bg-white shadow-lg'} h-auto p-3`}>
            {option.id===2 && <ScrollArea
            className="w-full flex flex-col h-[300px] border-slate-100 border-2 rounded-lg py-2">
                {/* <div 
                className="w-full flex flex-row gap-x-5 m-2 items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                    <Image loading="lazy" 
                    src={'/images/dashboard/people-02.png'} 
                    alt={"chat-main"}
                    className="rounded-lg h-[40px] w-[40px]"
                    width={40}
                    height={40}
                    />
                    <div className="bg-zinc-700 text-white p-1 rounded-lg text-[10px] h-[23px] w-[23px] text-center">나</div> 
                    </div>
                    <p>{name}</p>
                </div> */}
            {/* {admin?.map((adm,index)=>(
                <div 
                key={index}
                className="w-full flex flex-row gap-x-5 gap-y-3 m-2 items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                    <Image loading="lazy" 
                    src={"/images/dashboard/people-01.png"} 
                    alt={"chat-main"}
                    className="rounded-lg h-[40px] w-[40px]"
                    width={40}
                    height={40}
                    />
                    <Image loading="lazy" 
                    src={"/svgs/icons/star-icon.svg"} 
                    alt={"chat-main"}
                    className="h-[20px] w-[20px] rounded-full bg-pink-500"
                    width={20}
                    height={20}
                    />
                    </div>
                  
                    <p>{adm}</p>
                </div>
            ))} */}
            {/* {sender?.filter(sen=>!admin?.includes(sen)).map((sen,index)=>(
                <div 
                key={index}
                className="w-full flex flex-row gap-x-12 gap-y-3 m-2 items-center">
                    <Image loading="lazy" 
                    src={"/images/dashboard/people-03.png"} 
                    alt={"chat-main"}
                    className="rounded-lg h-[40px] w-[40px]"
                    width={40}
                    height={40}
                    />
                    <p>{sen}</p>
                </div>
            ))} */}
            {userData.map((item, index)=>{
                
                return(
                <div 
                key={index}
                className="w-full flex flex-row gap-x-12 gap-y-3 m-2 items-center">
                    <Image loading="lazy" 
                    src={item.profile !== "" ? item.profile : "/images/dashboard/people-03.png"} 
                    alt={"chat-main"}
                    className="rounded-lg h-[40px] w-[40px]"
                    width={40}
                    height={40}
                    />
                    <p>{item.name}</p>
                </div>
            )})}
            </ScrollArea>}
            {message.map((msg)=>(
                <p 
                key={msg.indexOf(msg)}
                className="text-black font-medium text-md text-pretty">{msg}</p>
            ))}
            <div className="flex flex-row gap-x-3 justify-end mt-3">
                <button
                onClick={()=>setOpen(false)}
                className="text-blue-500 text-sm hover:bg-blue-50 rounded-full p-2"
                >
                    <p>{option.id===1? '취소':'닫기'}</p>
                </button>
                {option.id===1 && <button
                onClick={()=>{
                    setOpen(false);
                    if(type==='block'){
                        useChatAlertStore.setState({
                            fadeOut:true,
                            message:chat?.senderName+`님이 채팅방을 나가셨습니다`,
                        });
                    }else if(type==='drawer' && option.id===1){
                        
                            
                    }
                   
                }}
                className="text-blue-500 text-md hover:bg-blue-50 rounded-full p-2"
                >
                    <p>{option.title}</p>
                </button>}
            </div>
        </div>
    </dialog>
    </>);
}
export default ChatCautionModal;