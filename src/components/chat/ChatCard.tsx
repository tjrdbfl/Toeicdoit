'use client';
import { ChatRoomPhoto, ChatUserPhoto, getChatCategoryTitle } from "@/service/chat/util";
import Image from "next/image";
import Link from "next/link";
import { ChatRoomData } from "@/types/ChatData";


const ChatCard = ({ chat }: {
    chat: ChatRoomData
}
) => {
   

    return (<>
        <Link
            href={`?chat=true&roomId=${chat.id}`}
            key={chat.id}
            className="bg-white w-full h-[120px] border-b-slate-200 border-b-2 flex flex-col px-3 justify-center hover:bg-slate-50"
        >
            <div className="flex flex-row justify-between chats-center gap-x-2">
                <div className="flex flex-col">
                    <h4 className="text-black text-pretty font-medium leading-6">{chat.title.length > 24 ? chat.title.slice(0, 24) + '...' : chat.title}</h4>
                    <div className="flex flex-wrap gap-x-3 ">
                        {chat.roomCategories.map((category, index) => (
                            <h5
                                key={index}
                                className="text-blue-500 mt-2"
                            ># {getChatCategoryTitle(category)}</h5>
                        ))}
                    </div>
                    <div className="flex flex-row gap-x-2 mt-1 itmes-center">
                        <div className="w-[22px] object-fill rounded-full">
                            <Image
                                src={ChatUserPhoto(0)}
                                alt={"user-info"}
                                width={100}
                                height={100}
                            />
                        </div>
                        <h6 className="text-zinc-500">
                            {chat.memberIds.length}명
                        </h6>
                    </div>

                </div>
                <Image
                    src={ChatRoomPhoto(chat.roomCategories[0])}
                    alt={"chat-roon-profile"}
                    width={120}
                    height={90}
                    className="flex justify-center chats-center border-slate-100 border-2 rounded-xl p-2"
                />
            </div>
        </Link>
    </>);
}
export default ChatCard;