'use client';
import { useChatBlockStore } from "@/store/chat/store";
import { useEffect } from "react";

export default function ExitMessage() {
    const { fadeOut,username } = useChatBlockStore();
    
    useEffect(()=>{
        const timer=setTimeout(()=>{
            useChatBlockStore.setState({
                fadeOut:false,
                username:''
            });
        },3000);

        return ()=>clearTimeout(timer);
    },[fadeOut,username]);
    return (fadeOut && <dialog className="z-10 flex justify-center bg-transparent mt-20">
        <div className={`${fadeOut ? 'fade-out-scale' : 'fade-in-scale'} fade-out-animation rounded-full mx-10 text-black py-2 px-5 flex items-center justify-center bg-blue-50 text-center text-pretty`}>
            <p className="text-black">{username}님이 채팅방을 나가셨습니다.</p>
        </div>
    </dialog>);
}