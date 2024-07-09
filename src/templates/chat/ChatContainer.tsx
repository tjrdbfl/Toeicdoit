'use server';

import { LogoIcon } from "@/components/common";
import Modal from "@/components/common/Modal";
import { ChatRoomData } from "@/types/ChatData";
import ChatScrollArea from "./ChatScrollArea";
import UserChatRoom from "./UserChatRoom";

const ChatContainer = async () => {
    //유저의 기존 채팅방 페이지 server action
    const chat: ChatRoomData[] = [];
    //전체 채팅방 페이지 with infinite scroll pagination
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