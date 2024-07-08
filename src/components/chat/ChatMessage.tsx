'use client';
import { ChatData } from "@/types/ChatData";
import Image from "next/image";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { SetStateAction, useState } from "react";
import ChatToolModal from "./ChatToolModal";

const ChatMessage = ({ chat }: { chat: ChatData }) => {

    const block:{id:number,title:string,message:string}[]=[
        {
            id:1,
            title:'퇴출',
            message:`해당 채팅방에서 나가게 됩니다. 다시 초대를 받으면 재입장 가능합니다. 퇴출된 사용자는 방 우측 상단에 배너에서 차단 리스트를 통햐 관리할 수 있습니다.`
        },
        {
            id: 2,
            title: '차단',
            message: "상대방의 메시지가 보이지 않게 됩니다. 차단 해제 전까지 해당 채팅방에서 상대방과 대화할 수 없습니다. 차단 해제는 방 우측 상단에 서랍을 통해 가능합니다."
        },
        {
            id: 3,
            title: '차단 및 퇴출',
            message: ""
        },
    ];

    const [openModal,setOpenModal]=useState<boolean>(false);

    return (<>
        <div className="w-full">
            <div className={`flex ${chat.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                {chat.senderId === 'user' ?
                    <div className="flex flex-row gap-x-2">
                         <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[14px]">{chat.createdAt?.toISOString().slice(0, 10)}</p>
                            <p className=" text-black text-[14px]">{chat.createdAt?.toLocaleTimeString('ko-KR',{hour12:true}).slice(0,8)}</p>
                        </div>
                        <div className="bg-[#FFF9D0] text-black p-2 rounded-lg max-w-[300px] text-pretty">{chat.message}</div>
                    </div>
                    :
                    <div className="flex flex-row gap-x-2">
                        <button 
                        onClick={()=>{setOpenModal(true)}}
                        className="object-fill w-[50px] h-[50px] rounded-full flex items-start hover:ring-4 hover:ring-blue-300">
                            <Image
                                src={"/images/dashboard/people-01.png"}
                                alt={"user_profile"}
                                width={100}
                                height={100}
                                style={{ borderRadius: 'full' }}
                            />
                        </button>
                        {openModal && <ChatToolModal name={chat.senderName} setOpen={setOpenModal}/>}
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-row">
                                {chat.senderId === 'admin' && <StarPurple500Icon className="text-pink-500" />}
                                <p className="text-black font-medium">{chat.senderName}</p>
                            </div>
                            <div className="bg-white text-black p-2 rounded-lg max-w-[270px] text-pretty">{chat.message}</div>
                        </div>
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[14px]">{chat.createdAt?.toISOString().slice(0, 10)}</p>
                            <p className=" text-black text-[14px]">{chat.createdAt?.toLocaleTimeString('ko-KR',{hour12:true}).slice(0,8)}</p>
                        </div>
                    </div>

                }


            </div>
        </div>
    </>);
}
export default ChatMessage;