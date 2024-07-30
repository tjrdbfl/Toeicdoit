'use client';
import { ChatData } from "@/types/ChatData";
import Image from "next/image";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { SetStateAction, useState } from "react";
import PopOverOption from "./PopOverOption";
import ChatCautionModal from "./ChatCautionModal";
import { block } from "@/constants/chat/constant";
import { classifyAMPM } from "@/service/chat/util";

const ChatMessage = ({ chat,token }: {
     chat: ChatData,
     token: string|undefined,
}) => {

    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(4);

    return (<>
        <div className="w-full">
            <div className={`flex ${chat.senderId === token ? 'justify-end' : 'justify-start'}`}>
                {chat.senderId === 'user' ?
                    <div className="flex flex-row gap-x-2">
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[14px]">{chat.createdAt.slice(0,10)}</p>
                            <p className=" text-black text-[14px]">{classifyAMPM(chat.createdAt.slice(11,13)) +' '+chat.createdAt.slice(11,16)}</p>
                        </div>
                        <div className="bg-[#FFF9D0] text-black p-2 rounded-lg max-w-[300px] text-pretty">{chat.message}</div>
                    </div>
                    :
                    <div className="flex flex-row gap-x-2">
                        <PopOverOption
                            buttonChildren={
                            <Image
                                src={"/images/dashboard/people-01.png"}
                                alt={"user_profile"}
                                width={50}
                                height={50}
                                style={{ borderRadius: 'full' }}
                                className=""
                            />}
                            optionChildren={
                                <div className="flex flex-col">
                                    {block.map((item) => {
                                        return (
                                            <button
                                            key={item.id}
                                                onClick={() => {
                                                    setOpenModal(true)
                                                    setSelectedId(item.id)
                                                }}
                                                className="bg-white w-[100px] text-black text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                                                {item.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            }
                            buttonStyle={"object-fill w-[30px] h-[30px] rounded-full flex items-start hover:ring-4 hover:ring-blue-300 ml-2"} />
                        {openModal && <ChatCautionModal
                            type='block'
                            chat={chat}
                            option={block[selectedId - 1]}
                            setOpen={setOpenModal} />}
                        
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-row">
                                {chat.senderId === 'admin' && <StarPurple500Icon className="text-pink-500" />}
                                <p className="text-black text-[15px] font-medium">{chat.senderName}</p>
                            </div>
                            <div className="bg-white text-[15px] text-black p-2 rounded-lg max-w-[270px] text-pretty">{chat.message}</div>
                        </div>
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[12px]">{chat.createdAt.slice(0,10)}</p>
                            <p className=" text-black text-[12px]">{classifyAMPM(chat.createdAt.slice(11,13)) +' '+chat.createdAt.slice(11,16)}</p>
                        </div>
                    </div>

                }
            </div>
        </div>
    </>);
}
export default ChatMessage;