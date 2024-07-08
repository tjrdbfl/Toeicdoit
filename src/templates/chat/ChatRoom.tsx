'use client'
import { ChatData } from "@/types/ChatData";
import ChatMessage from "@/components/chat/ChatMessage";
import { useEffect, useRef } from "react";

const ChatRoom = ({
    chat
}: {
    chat: ChatData,
}) => {

    const scrollRef=useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
        }      
    },[]);
    
    return (<>
        <div 
        ref={scrollRef}
        className="overflow-y-auto h-[500px] mt-5 mb-4 scroll-area p-2">
            <div className="flex flex-col gap-y-7">
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "admin",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "user",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "other",
                    senderName: "작성자",
                    message: "안녕하세요!",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "other",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: undefined,
                    updatedAt: undefined
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "other",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: undefined,
                    updatedAt: undefined
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "other",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: undefined,
                    updatedAt: undefined
                }} />
                <ChatMessage chat={{
                    id: "",
                    roomId: "",
                    senderId: "other",
                    senderName: "작성자",
                    message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                    createdAt: undefined,
                    updatedAt: undefined
                }} />

            </div>

        </div>
        <form
            className="flex flex-row w-full h-[70px]"

        >
            <textarea
                name="chat"
                id="chat"
                required
                className="bg-white w-full h-[50px] max-h-[70px] scroll-area p-3 leading-6"
            />
            <button
                className="bg-black text-white w-[70px] h-[50px] text-lg hover:bg-zinc-800"
            >전송</button>
        </form>
    </>);
}
export default ChatRoom;