'use client';
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { ChatRoomData } from "@/types/ChatData";
import CloseIcon from '@mui/icons-material/Close';
import SettingChatContainer from "@/templates/chat/SettingChatContainer";
import { ScrollArea } from "../utils/ScrollArea";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getUserIdInCookie, getUserInfoInCookie } from "@/service/utils/token";
import { ERROR } from "@/constants/enums/ERROR";


const SettingRoomToolBtn = ({ chat }: { chat: ChatRoomData }) => {
    
    const searchParams=useSearchParams();
    const router = useRouter();
    const queryParams=new URLSearchParams(searchParams);
    queryParams.set('setting','true');

    const handleCloseModal = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("setting");
        router.push("?" + newSearchParams.toString(), { scroll: false });
    };

    const handleUserId = async () => {
        const response = await getUserIdInCookie();

        console.log('response: ' + JSON.stringify(response));
        if (response.message === ERROR.INVALID_MEMBER
            || response.message === ERROR.SERVER_ERROR || response.data === undefined
        ) {
            alert(ERROR.INVALID_MEMBER);
        } else {
            router.push(`?${queryParams.toString()}`);
        }
    }

    return (<>
        <button
        onClick={handleUserId}   
        className="bg-white mb-5 text-black font-semibold py-2 px-3 rounded-lg shadow-lg flex flex-row justify-center items-center gap-x-2 hover:bg-slate-50">
            <Image loading="lazy"
                src={"/svgs/icons/setting-icon.svg"}
                alt={"setting-icon"}
                width={17}
                height={17}
                className="w-[20px] h-[20px]"
            />
            <p className="text-[14px]">설정</p>
        </button>
        {searchParams.get('setting')==='true' && <>
            <dialog
                className="fixed inset-0 z-20 flex justify-end items-end mr-40 mb-20"
            >
                <ScrollArea
                    className="bg-blue-100 w-[450px] h-[700px] shadow-lg border-slate-200 border-2 p-5 overflow-y-auto">
                    <div className='flex flex-row justify-between items-start mb-5'>
                        <h1
                            className="form_label"
                        >설정</h1>
                        <button
                            onClick={handleCloseModal}
                            className='hover:bg-blue-50 rounded-full flex items-center justify-center p-2 '
                        >
                            <Image loading="lazy"
                                src={"/svgs/icons/close-icon.svg"}
                                alt={"close-icon"}
                                width={17}
                                height={17}
                                className="w-[20px] h-[20px]"
                            />
                        </button>

                    </div>
                    <SettingChatContainer/>

                </ScrollArea>

            </dialog>

        </>}
    </>);
}
export default SettingRoomToolBtn;