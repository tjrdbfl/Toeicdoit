'use client';

import { ChatOptionType, drawer } from "@/constants/chat/constant";
import PopOverOption from "./PopOverOption";
import { useState } from "react";
import Image from "next/image";
import ChatCautionModal from "./ChatCautionModal";
import { ChatRoomData } from "@/types/ChatData";
import { getUserInfoInCookie } from "@/service/utils/token";
import { useUserInfoStore } from "@/store/auth/store";
import { findByNameProfile } from "@/service/auth/actions";

const ChatDrawer = ({ room }: {
    room: ChatRoomData
}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { name, profile } = useUserInfoStore();
    const [send,setSend]=useState(false);
    const [userData,setUserData]=useState<{userId:string,name:string,profile:string}[]>([]);
    

    const handlebutton = async () => {
        setOpenModal(true)

        const userInfo = await getUserInfoInCookie();
        useUserInfoStore.setState({
            name: userInfo.data?.name,
            profile: userInfo.data?.name
        });

        const userList=room.adminIds.map((adm)=>parseInt(adm)).concat(room.memberIds.filter((mem)=>!room.adminIds.includes(mem) && mem!==null).map((mem)=>parseInt(mem)));
        
        const findNameProfile = await findByNameProfile(userList);
        const result=await findNameProfile.data;
        setUserData(Object.entries(result).map(([name, value]) => {
            return {userId: (name as string), name: (value as string[])[0], profile: (value as string)[1]}
        }));
        setSend(true);

        console.log('userData: '+JSON.stringify(userData));
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
                {/* {drawer.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={()=>handlebutton(item)}
                            className="bg-white text-[14px] w-[120px] text-black text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                            {item.title}
                        </button>
                    );
                })} */}
                <button
                    key={1}
                    onClick={() => handlebutton()}
                    className="bg-white text-[14px] w-[120px] text-black text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                    현 대화상대 보기
                </button>
            </div>}
            buttonStyle='flex justify-start hover:bg-blue-50 rounded-full p-2'
        />
        {openModal && <ChatCautionModal
            type='drawer'
            option={drawer[1]}
            setOpen={setOpenModal}
            sender={room.memberIds}
            admin={room.adminIds}
            name={name}
            profile={profile}
            userData={userData}
        />}
    </>);
}
export default ChatDrawer;