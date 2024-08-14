'use client';
import { ChatRoomPhoto, ChatUserPhoto, getChatCategoryTitle } from "@/service/chat/util";
import Image from "next/image";
import Link from "next/link";
import { ChatRoomData } from "@/types/ChatData";
import ChatRoomToolBtn from "../button/ChatRoomToolBtn";
import { enterRoom } from "@/service/chat/actions";
import { handleError } from "@/service/utils/error";



const SettingCard = ({ chat,type }: {
    chat: ChatRoomData,
    type:string
}
) => {

    return (<div className="flex flex-row gap-x-2 items-center bg-white border-b-slate-200 border-b-2 px-2">
        <Link
            href={`?chat=true&setting=true&roomId=${chat.id}`}
            key={chat.id}
            onClick={async()=>{
                const response=await enterRoom(chat.id);
                handleError(response.message);
            }}
            className="bg-white w-full h-[80px] flex flex-col p-3 justify-center hover:bg-slate-50"
        >
            <div className="flex flex-row justify-between chats-center gap-x-2">
                <div className="flex flex-col">
                    <h4 className="text-black text-pretty font-medium leading-6 text-[14px]">{chat.title.length > 24 ? chat.title.slice(0, 24) + '...' : chat.title}</h4>
                    <div className="flex flex-wrap gap-x-3">
                        {chat.roomCategories.map((category, index) => (
                            <h5
                                key={index}
                                className="text-blue-500 text-[12px]"
                            ># {getChatCategoryTitle(category)}</h5>
                        ))}
                    </div>
                    <div className="flex flex-row gap-x-2 mt-1 itmes-center">
                        <div className="w-[18px] object-fill rounded-full">
                            <Image loading="lazy"
                                src={ChatUserPhoto(0)}
                                alt={"user-info"}
                                width={100}
                                height={100}
                            />
                        </div>
                        <h6 className="text-zinc-500 text-[12px]">
                            {chat.memberIds.length}명
                        </h6>
                    </div>

                </div>
                <Image loading="lazy"
                    src={ChatRoomPhoto(chat.roomCategories[0])}
                    alt={"chat-roon-profile"}
                    width={70}
                    height={40}
                    className="flex h-[60px] justify-center chats-center border-slate-100 border-2 rounded-xl p-3"
                />
               </div>
        </Link>
        {type==='admin' && <ChatRoomToolBtn chat={chat} />}
            
    </div>);
}
export default SettingCard;