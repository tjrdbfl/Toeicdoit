'use server';

import { CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { useChatAlertStore } from "@/store/chat/store";
import { ChatData, I_ApiChatMsgGetRequest } from "@/types/ChatData";
import { MessageData } from "@/types/MessengerData";
import { ITEMS_PER_PAGE } from "@/types/ToeicData";
import { revalidatePath, revalidateTag } from "next/cache";
import { RefObject } from "react";

export async function sendMessage(chatId:string,roomId:string,formData: FormData) {

    console.log("formData" + formData.get('message')?.toString());
    console.log("formData" + chatId);

    try {
        if (formData.get('message')?.toString() === '' || chatId==='') {
            console.log('sendMessage: '+ERROR.INVALID_INPUT);
            return;
        }

      //  쿠키 꺼내기 필요 
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/chat`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify({message:formData.get('message')?.toString(),roomId:chatId})
        }).then(async (res)=>{
            console.log(await res.json())
        });

    } catch (err) {
        console.error(err);
    }
}
export async function fetchChatMessage({ 
    pageParam = 1, roomId
}:{
    pageParam:number,roomId:string
}){
    console.log('pageParam: ',pageParam);

    let chats:ChatData[]=[];
    
    const payload:I_ApiChatMsgGetRequest={
        page:pageParam,
        roomId:roomId
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/`,{
            method:'GET',
            headers:CommonHeader,
            body:JSON.stringify(payload),
            cache:'no-store'
        })

        if(!response.ok){
            useChatAlertStore.setState({
                fadeOut:true,
                message:ERROR.SERVER_ERROR
            });
            return;
        }

        const data:MessageData=await response.json();

        if(data && data.message==='success'){
            chats=data.data as ChatData[];;
        }else{
            useChatAlertStore.setState({
                fadeOut:true,
                message:ERROR.SERVER_ERROR
            });
            return;
        }
        const nextPage=chats.length===ITEMS_PER_PAGE ? pageParam+1:null;
        
        return{
            data:chats,
            currentPage:pageParam,
            nextPage:nextPage
        }
    }catch(err){
        console.log('fetchChatMessage error: '+err);
        useChatAlertStore.setState({
            fadeOut:true,
            message:ERROR.SERVER_ERROR
        });

        return{
            data:chats,
            currentPage:pageParam,
            nextPage:null
        }
    }
}