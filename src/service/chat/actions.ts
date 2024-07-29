'use server';

import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { useChatAlertStore } from "@/store/chat/store";
import { ChatData, ChatRoomData, I_ApiChatMsgGetRequest } from "@/types/ChatData";
import { MessageData, MessageState } from "@/types/MessengerData";
import { ITEMS_PER_PAGE } from "@/types/ToeicData";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function fetchChatRoom({
    pageParam = 1, category
}: {
    pageParam: number, category: 'STUDY' | 'FREE' | 'WORK' | 'UNI' | 'SEEK' | 'ETC'
}) {
    let chat: ChatRoomData[] = [];
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken !== undefined) {
    
        let response: Response;
        try {
            if (category === 'ETC') {
                console.log('find-all chat');
                response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${SERVER_API.ROOM}/find-all?page=${pageParam}&size=10`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    cache: 'no-store'
                });
            }
            else {
                console.log('find-by chat');

                response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${SERVER_API.ROOM}/find-by?type=roomCategories&value=${category}&size=10&page=${pageParam}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    cache: 'no-store'
                });
            }
            const result: MessageData = await response.json();

            if (!result.state) {
                return {
                    data: chat,
                    currentPage: pageParam,
                    nextPage: null,
                    error: true,
                    message: ERROR.SERVER_ERROR
                };
            } else {

                chat = result.data as ChatRoomData[];

                const nextPage = chat.length === ITEMS_PER_PAGE ? pageParam + 1 : null;
                console.log('nextPage: ' + nextPage);
                console.log('currentPage: ' + pageParam);
                console.log('chat: ' + chat.length);

                return {
                    data: chat,
                    currentPage: pageParam,
                    nextPage: nextPage,
                    error:false,
                };
            }

        } catch (err) {
            console.log('Failed to get chat: ', err);
            return {
                data: chat,
                currentPage: pageParam,
                nextPage: null,
                error: true,
                message: ERROR.SERVER_ERROR
            };
        }

    } else {
        return {
            data: null,
            currentPage: pageParam,
            nextPage: null,
            error: true,
            message: ERROR.INVALID_MEMBER
        };
    }
}

export async function saveRoom(category:string[],prevState:MessageState,formData:FormData){

    const title=formData.get('title')?.toString();
    console.log(category);

    if(category?.length===0 || title?.length===0){
        return {message:ERROR.INVALID_INPUT};
    }
    
    const accessToken=cookies().get('accessToken')?.value;

    if(accessToken!==undefined){
        const response=await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${SERVER_API.ROOM}/save`,{
            method:'POST',
            body:JSON.stringify({
                title,
                roomCategories:category,
                adminIds:accessToken
            }),
            headers:AuthorizeHeader(accessToken),
            cache:'no-store'
        });

        const result:MessageData=await response.json();

        if(result.state){
            console.log(result.state);
            revalidatePath('/?chat=true');  
            return {message:'SUCCESS'};
        }else{
            return {message:ERROR.SERVER_ERROR};
        }

    }else{
        return {message:ERROR.INVALID_MEMBER};
    }

}

export async function sendMessage(chatId: string, roomId: string, formData: FormData) {

    console.log("formData" + formData.get('message')?.toString());
    console.log("formData" + chatId);

    try {
        if (formData.get('message')?.toString() === '' || chatId === '') {
            console.log('sendMessage: ' + ERROR.INVALID_INPUT);
            return;
        }

        //  쿠키 꺼내기 필요 
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/chat`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify({ message: formData.get('message')?.toString(), roomId: chatId })
        }).then(async (res) => {
            console.log(await res.json())
        });

    } catch (err) {
        console.error(err);
    }
}
export async function fetchChatMessage({
    pageParam = 1, roomId
}: {
    pageParam: number, roomId: string
}) {
    console.log('pageParam: ', pageParam);

    let chats: ChatData[] = [];

    const payload: I_ApiChatMsgGetRequest = {
        page: pageParam,
        roomId: roomId
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/`, {
            method: 'GET',
            headers: CommonHeader,
            body: JSON.stringify(payload),
            cache: 'no-store'
        })

        if (!response.ok) {
            useChatAlertStore.setState({
                fadeOut: true,
                message: ERROR.SERVER_ERROR
            });
            return;
        }

        const data: MessageData = await response.json();

        if (data && data.message === 'success') {
            chats = data.data as ChatData[];;
        } else {
            useChatAlertStore.setState({
                fadeOut: true,
                message: ERROR.SERVER_ERROR
            });
            return;
        }
        const nextPage = chats.length === ITEMS_PER_PAGE ? pageParam + 1 : null;

        return {
            data: chats,
            currentPage: pageParam,
            nextPage: nextPage
        }
    } catch (err) {
        console.log('fetchChatMessage error: ' + err);
        useChatAlertStore.setState({
            fadeOut: true,
            message: ERROR.SERVER_ERROR
        });

        return {
            data: chats,
            currentPage: pageParam,
            nextPage: null
        }
    }
}