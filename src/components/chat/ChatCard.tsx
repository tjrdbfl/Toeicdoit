'use client';
import { ChatRoomPhoto, ChatUserPhoto, getChatCategoryTitle } from "@/service/chat/util";
import Image from "next/image";
import Link from "next/link";
import { ChatRoomData } from "@/types/ChatData";
import { getUserIdInCookie } from "@/service/utils/token";
import { ERROR } from "@/constants/enums/ERROR";
import { useRouter } from "next/navigation";
import { enterRoom } from "@/service/chat/actions";


const ChatCard = ({ chat }: {
    chat: ChatRoomData
}
) => {
    const router = useRouter();

    const handleUserId = async () => {
        const response = await getUserIdInCookie();

        console.log('response: ' + JSON.stringify(response));
        if (response.message === ERROR.INVALID_MEMBER
            || response.message === ERROR.SERVER_ERROR || response.data === undefined
        ) {
            alert(ERROR.INVALID_MEMBER);
        } else {
            const userId=response.data;

            const repsonse = await enterRoom(chat.id); 
                if (response.message === 'SUCCESS') {
                    router.push(`?chat=true&roomId=${chat.id}`);
                } 
            // if(chat.adminIds.filter((mem)=>mem===userId).length!==0){
            //     const repsonse = await enterRoom(chat.id); 
            //     if (response.message === 'SUCCESS') {
            //         router.push(`?chat=true&roomId=${chat.id}`);
            //     } 
            // }else{
            //     router.push(`?chat=true&roomId=${chat.id}`); 
            // }

        }
    }

    return (<>
        <button
            onClick={handleUserId}
            key={chat.id}
            className="bg-white w-full h-[100px] border-b-slate-200 border-b-2 flex flex-row px-3 justify-between items-center hover:bg-slate-50"
        >
            <div className="flex flex-row justify-between chats-center gap-x-2">
                <div className="flex flex-col">
                    <h4 className="text-black text-pretty text-start font-medium leading-6">{chat.title.length > 24 ? chat.title.slice(0, 24) + '...' : chat.title}</h4>
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
                            <Image loading="lazy"
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

            </div>
            <Image loading="lazy"
                src={ChatRoomPhoto(chat.roomCategories[0])}
                alt={"chat-roon-profile"}
                width={100}
                height={80}
                className="flex justify-center chats-center border-slate-100 border-2 rounded-xl p-2"
            />
        </button>
    </>);
}
export default ChatCard;