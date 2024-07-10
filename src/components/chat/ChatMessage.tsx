'use client';
import { ChatData } from "@/types/ChatData";
import Image from "next/image";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { SetStateAction, useState } from "react";
import PopOverOption from "./PopOverOption";
import ChatCautionModal from "./ChatCautionModal";
import { block } from "@/constants/chat/constant";

const ChatMessage = ({ chat }: { chat: ChatData }) => {

    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(4);

    return (<>
        <div className="w-full">
            <div className={`flex ${chat.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                {chat.senderId === 'user' ?
                    <div className="flex flex-row gap-x-2">
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[14px]">{chat.createdAt?.toISOString().slice(0, 10)}</p>
                            <p className=" text-black text-[14px]">{chat.createdAt?.toLocaleTimeString('ko-KR', { hour12: true }).slice(0, 8)}</p>
                        </div>
                        <div className="bg-[#FFF9D0] text-black p-2 rounded-lg max-w-[300px] text-pretty">{chat.message}</div>
                    </div>
                    :
                    <div className="flex flex-row gap-x-2">
                        <PopOverOption
                            buttonChildren={<Image
                                src={"/images/dashboard/people-01.png"}
                                alt={"user_profile"}
                                width={100}
                                height={100}
                                style={{ borderRadius: 'full' }}
                            />}
                            optionChildren={
                                <div className="flex flex-col">
                                    {block.map((item) => {
                                        return (
                                            <button
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
                            buttonStyle={"object-fill w-[50px] h-[50px] rounded-full flex items-start hover:ring-4 hover:ring-blue-300"} />
                        {openModal && <ChatCautionModal
                            type='block'
                            chat={chat}
                            option={block[selectedId - 1]}
                            setOpen={setOpenModal} />}
                        
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-row">
                                {chat.senderId === 'admin' && <StarPurple500Icon className="text-pink-500" />}
                                <p className="text-black font-medium">{chat.senderName}</p>
                            </div>
                            <div className="bg-white text-black p-2 rounded-lg max-w-[270px] text-pretty">{chat.message}</div>
                        </div>
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-black text-[14px]">{chat.createdAt?.toISOString().slice(0, 10)}</p>
                            <p className=" text-black text-[14px]">{chat.createdAt?.toLocaleTimeString('ko-KR', { hour12: true }).slice(0, 7)}</p>
                        </div>
                    </div>

                }
            </div>
        </div>
    </>);
}
export default ChatMessage;