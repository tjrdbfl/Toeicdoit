'use client';

import { ChatOptionType, drawer } from "@/constants/chat/constant";
import PopOverOption from "./PopOverOption";
import { useState } from "react";
import Image from "next/image";
import ChatCautionModal from "./ChatCautionModal";
import { ChatRoomData } from "@/types/ChatData";
import { getUserInfoInCookie } from "@/service/utils/token";
import { useUserInfoStore } from "@/store/auth/store";

const ChatDrawer = ({room}:{
    room:ChatRoomData
}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(4);
    const {name,profile}=useUserInfoStore();

    const handlebutton=async(item: ChatOptionType)=>{
        setOpenModal(true)
        setSelectedId(item.id);
        
        if(item.id===1){

        }else{
            const userInfo=await getUserInfoInCookie();
            useUserInfoStore.setState({
                name:userInfo.name,
                profile:userInfo.profile
            });
         
            
        }
    }

    return (<>
        <PopOverOption
            buttonChildren={
                <Image
                    src={"/svgs/icons/menu-icon.svg"}
                    alt={"menu-icon"}
                    width={20}
                    height={20}
                />}
            optionChildren={<div className="flex flex-col">
                {drawer.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={()=>handlebutton(item)}
                            className="bg-white text-[14px] w-[120px] text-black text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                            {item.title}
                        </button>
                    );
                })}
            </div>}
            buttonStyle='flex justify-start hover:bg-blue-50 rounded-full p-2'
        />
        {openModal && <ChatCautionModal
            type='drawer'
            option={drawer[selectedId - 1]}
            setOpen={setOpenModal} 
            sender={room.memberIds}
            admin={room.adminIds}
            name={name}
            profile={profile}
            />}
    </>);
}
export default ChatDrawer;