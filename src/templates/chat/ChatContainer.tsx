'use server';

import { LogoIcon } from "@/components/common";
import Modal from "@/components/common/Modal";
import { ChatRoomData } from "@/types/ChatData";
import ChatScrollArea from "./ChatScrollArea";
import UserChatRoom from "./UserChatRoom";
import { cookies } from "next/headers";
import { MessageData } from "@/types/MessengerData";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER_API } from "@/constants/enums/API";

const ChatContainer = async () => {
    //유저의 기존 채팅방 페이지 server action
    let chat: ChatRoomData[]=[]
    //전체 채팅방 페이지 with infinite scroll pagination
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${SERVER_API.ROOM}/find-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get('accessToken')}`
            },
            cache: 'no-store'
        });

        const result:MessageData=await response.json();

        if(result.state){
            chat=result.data as ChatRoomData[];
        }else{
            console.log(ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log(err);
    }
      
    return (<>
        <Modal>
            <div 
            className="bg-blue-100 w-[500px] h-[700px] shadow-lg border-slate-200 border-2"
            >
                <div className="flex flex-row py-3 rounded-b-xl shadow-lg
                bg-gradient-to-r from-blue-500 via-blue-500 to-purple-500                              
                ">
                    <LogoIcon size={25} />
                    <p className="text-white text-xl font-medium">Toeicdoit 오픈 채팅</p>
                </div>
                <div className="mt-5"/>
                <ChatScrollArea>
                    <UserChatRoom chat={chat}/>
                </ChatScrollArea>
                
            </div>
        </Modal>

    </>);
}
export default ChatContainer;