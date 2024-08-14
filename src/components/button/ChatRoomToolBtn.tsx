'use client';
import Image from "next/image";
import { SetStateAction, useState } from "react";
import PopOverOption from "../chat/PopOverOption";
import { ChatRoomData } from "@/types/ChatData";
import { deleteRoomById } from "@/service/chat/actions";
import { handleError } from "@/service/utils/error";
import UpdateChatForm from "@/templates/chat/UpdateChatForm";
import CloseIcon from '@mui/icons-material/Close';
import { getUserIdInCookie } from "@/service/utils/token";


const ChatRoomToolBtn = ({ chat }: {
    chat: ChatRoomData
}) => {

    const [open, setOpen] = useState<boolean>(false);
    const handleDelete = async () => {
        const response = await deleteRoomById(chat.id);

        if(response.message!=='SUCCESS'){
            handleError(response.message);
        }
       
    }

    return (<>
        <PopOverOption
            buttonChildren={<Image loading="lazy"
                src={"/svgs/icons/more-icon.svg"}
                alt={"more-icon"}
                width={20}
                height={20}
                className="w-[25px] h-[20px] rounded-full"
            />}
            optionChildren={
                <div className="flex flex-col">
                    <button
                        onClick={()=>{setOpen(true)}}
                        className="bg-white w-[120px] text-black text-[14px] text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                        채팅방 정보 변경
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-white w-[120px] text-black text-[14px] text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                        채팅방 삭제
                    </button>
                </div>
            }
            buttonStyle={"bg-white p-1 hover:bg-blue-200 rounded-full flex items-center justify-center"} />
        {
            open &&
            <dialog
                className="fixed inset-0 flex justify-end items-end"
            >
                <div
                    className="bg-blue-100 w-[400px] h-[450px] shadow-lg border-slate-200 border-2 p-5"
                >
                    <div className='flex flex-row justify-between items-center'>
                        <h1
                            className="form_label mt-2"
                        >오픈 채팅방 정보 변경하기</h1>
                        <button
                            onClick={() => {setOpen(false)}}
                            className='hover:bg-blue-50 rounded-full flex items-center justify-center p-2'
                        >
                            <CloseIcon className='' />
                        </button>

                    </div>
                    <UpdateChatForm chat={chat} setCreate={setOpen} />
                </div>

            </dialog>

        }
    </>);
}
export default ChatRoomToolBtn;