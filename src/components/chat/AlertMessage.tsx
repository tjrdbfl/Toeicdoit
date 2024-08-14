'use client';
import { useChatAlertStore } from "@/store/chat/store";
import { useEffect } from "react";

export default function AlertMessage() {
    const { fadeOut,message } = useChatAlertStore();
    
    //AlertMessage 초기화
    useEffect(()=>{
        const timer=setTimeout(()=>{
            useChatAlertStore.setState({
                fadeOut:false,
                message:''
            });
        },3000);

        return ()=>{
            clearTimeout(timer)
        };
    },[fadeOut,message]);

    return (fadeOut && <dialog className="fixed inset-0 z-0 flex justify-end items-start bg-transparent mr-72"
        >
        <div className={`${fadeOut ? 'fade-out-scale' : 'fade-in-scale'} fade-out-animation rounded-full mx-10 text-black py-2 px-5 flex items-center justify-center bg-blue-50 text-center text-pretty`}>
            <p className="text-black">{message}</p>
        </div>
    </dialog>);
}