'use client';
import { ChatData } from "@/types/ChatData";
import Image from "next/image";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { SetStateAction, useEffect, useState } from "react";
import PopOverOption from "./PopOverOption";
import ChatCautionModal from "./ChatCautionModal";
import { block } from "@/constants/chat/constant";
import { classifyAMPM } from "@/service/chat/util";
import { extractCookie } from "@/service/utils/extract";
import { getUserIdInCookie } from "@/service/utils/token";
import { useUserInfoStore } from "@/store/auth/store";

const ChatMessage = ({ chat,token }: {
     chat: ChatData,
     token: string|undefined,
}) => {

    const {userId}=useUserInfoStore();


    const handleUserId=async()=>{
        const response=await getUserIdInCookie();

        if(response.message==='SUCCESS' && response.data!==undefined){
            useUserInfoStore.setState({
                userId:Number(response.data)
            });
        }
    }

    useEffect(()=>{
        handleUserId();
        console.log('userId: '+userId);
    },[]);
    
    return (<>
        <div className="w-full pr-5">
            <div className={`flex ${chat.senderId === userId.toString() ? 'justify-end' : 'justify-start'}`}>
                {chat.senderId === userId.toString() ?
                    <div className="flex flex-row gap-x-2">
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[12px]">{chat.createdAt?.slice(0,10)}</p>
                            <p className=" text-black text-[12px]">{classifyAMPM(chat.createdAt?.slice(11,13)) +' '+chat.createdAt?.slice(11,16)}</p>
                        </div>
                        <div className="bg-yellow-100 text-black p-2 rounded-lg max-w-[300px] text-pretty">{chat.message}</div>
                    </div>
                    :
                    <div className="flex flex-row gap-x-2">
                        <Image loading="lazy"
                                src={"/images/dashboard/people-01.png"}
                                alt={"user_profile"}
                                width={50}
                                height={50}
                                style={{ borderRadius: 'full' }}
                                className="w-[25px] h-[25px]"
                            />
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-row">
                                {chat.senderId === 'admin' && <StarPurple500Icon className="text-pink-500" />}
                                <p className="text-black text-[15px] font-medium">{chat.senderName}</p>
                            </div>
                            <div className="bg-white text-[15px] text-black p-2 rounded-lg max-w-[270px] text-pretty">{chat.message}</div>
                        </div>
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[12px]">{chat.createdAt?.slice(0,10)}</p>
                            <p className=" text-black text-[12px]">{classifyAMPM(chat.createdAt?.slice(11,13)) +' '+chat.createdAt?.slice(11,16)}</p>
                        </div>
                    </div>

                }
            </div>
        </div>
    </>);
}
export default ChatMessage;