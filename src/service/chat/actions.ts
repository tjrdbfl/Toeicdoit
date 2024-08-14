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
import { checkTokenExist } from "../utils/token";

export async function findUserChatRoom({
    pageParam = 0, category
}: {
    pageParam: number, category: string
}) {
    console.log('findUserChatRoom category: ' + category);
    let field: string = 'all';
    let chat: ChatRoomData[] = [];
    
    if (category !== 'all') {
        field = 'roomCategories';
    }

    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const cookieStore = cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const refreshToken = cookieStore.get('refreshToken')?.value;
        
        if (accessToken === undefined && refreshToken === undefined) {
            return { message: ERROR.INVALID_MEMBER };
        }
        else {
            checkTokenExist();
    
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/find-by?field=${field}&value=${category}&page=${pageParam}&size=10&sort=updatedAt,desc`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });
    
                const result: MessageData = await response.json();
                console.log('findUserChatRoom: ' + result);
    
                if (result.count !== 0) {
                    chat = result.data as ChatRoomData[];
    
                    const nextPage = chat.length === ITEMS_PER_PAGE ? pageParam + 1 : null;
    
                    return {
                        data: chat,
                        currentPage: pageParam,
                        nextPage: nextPage,
                        error: false,
                    };
                } else {
                    return {
                        data: chat,
                        currentPage: pageParam,
                        nextPage: null,
                        error: true,
                        message: ERROR.SERVER_ERROR
                    };
                }
            }
            catch (err) {
                console.log('Failed to findUserChatRoom: ', err);
                return {
                    data: chat,
                    currentPage: pageParam,
                    nextPage: null,
                    error: true,
                    message: ERROR.SERVER_ERROR
                };
            }
        }
    }
    
}

export async function fetchChatRoom({
    pageParam = 0, category
}: {
    pageParam: number, category: string
}) {

    let chat: ChatRoomData[] = [];
    let field: string = 'all';
    
    console.log('category: '+category);

    if (category === 'ALL' || category==='all') {
        field='all';
    }else{
        field = 'roomCategories';
    
    }


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.PUBLIC_ROOM}/find-by?field=${field!=='all'?'roomCategories':'all'}&value=${category}&page=${pageParam}&size=10&sort=updatedAt,desc`, {
            method: 'GET',
            headers: CommonHeader,
            cache: 'no-store'
        });

        const result: MessageData = await response.json();

        if (result.count===0) {
            return {
                data: chat,
                currentPage: pageParam,
                nextPage: null,
                error: true,
                message: ERROR.SERVER_ERROR
            };
        } else {
            //console.log('else');
            chat = result.data as ChatRoomData[];
        
            const nextPage = chat.length === ITEMS_PER_PAGE ? pageParam + 1 : null;
            console.log('nextPage: ' + nextPage);
            console.log('currentPage: ' + pageParam);
            console.log('chat: ' + chat.length);

            return {
                data: chat,
                currentPage: pageParam,
                nextPage: nextPage,
                error: false,
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
}

export async function saveRoom(category: string[], prevState: MessageState, formData: FormData) {

    const title = formData.get('title')?.toString();
    console.log(category);

    if (category?.length === 0 || title?.length === 0) {
        return { message: ERROR.INVALID_INPUT };
    }

    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const accessToken = cookies().get('accessToken')?.value;
    
        if (accessToken !== undefined) {
    
            const userId=cookies().get('userId')?.value;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/save`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    roomCategories: category,
                    adminIds: [userId]
                }),
                headers: AuthorizeHeader(accessToken),
                cache: 'no-store'
            });
    
            const result: MessageData = await response.json();
    
            if (result.state) {
                revalidateTag('chat');
               
                return { message: 'SUCCESS' };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } else {
            return { message: ERROR.INVALID_MEMBER };
        }
    
    }
   
}

export async function updateRoomById(category: string[],prevState: MessageState, formData: FormData) {

    const title = formData.get('title')?.toString();

    if (category?.length === 0 || title?.length === 0) {
        return { message: ERROR.INVALID_INPUT };
    }

    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const accessToken = cookies().get('accessToken')?.value;

        const userId=cookies().get('userId')?.value;

        if (accessToken !== undefined && userId!==undefined) {
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/update`, {
                method: 'PUT',
                body: JSON.stringify({
                    id:formData.get('roomId')?.toString(),
                    title,
                    roomCategories: category,
                    adminIds: [userId],
                }),
                headers: AuthorizeHeader(accessToken),
                cache: 'no-store'
            });
    
            console.log('updateRoomById: '+JSON.stringify(response));
            const result: MessageData = await response.json();
    
            if (result.state) {
                revalidateTag('/?chat=true&setting=true');

                return { message: 'SUCCESS' };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } else {
            return { message: ERROR.INVALID_MEMBER };
        }
    
    }    
    
}

export async function findRoomById(roomId: string) {

    const accessToken = cookies().get('accessToken')?.value;

    if (accessToken !== undefined) {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/find?id=${roomId}`, {
            method: 'GET',
            headers: AuthorizeHeader(accessToken),
            cache: 'no-store'
        });

        const result: MessageData = await response.json();

        if (result.state) {
            
            //revalidatePath(`/?chat=true?roomId=${roomId}`);
            revalidateTag('chat');

            return { data: result.data as ChatRoomData, message: 'SUCCESS' };
        } else {
            return { message: ERROR.SERVER_ERROR };
        }

    } else {
        return { message: ERROR.INVALID_MEMBER };
    }

}

export async function enterRoom(roomId: string) {

    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const accessToken = cookies().get('accessToken')?.value;

        const userId=cookies().get('userId')?.value;

        if (accessToken !== undefined) {
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/enter`, {
                method: 'POST',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({ roomId, userId: userId }),
                cache: 'no-store'
            });
    
            console.log('chat response: '+response.status);

            const result: MessageData = await response.json();
            
            console.log('chat response: '+JSON.stringify(result));
            
            if (result.state) {
                console.log(result.state);
                revalidateTag('chat');
                return { data: result.data as ChatRoomData, message: 'SUCCESS' };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } else {
            return { message: ERROR.INVALID_MEMBER };
        }
    
    }
    
}

export async function exitRoom(roomId: string) {

    const checkResposnse = await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const accessToken = cookies().get('accessToken')?.value;
        const userId=cookies().get('userId')?.value;

        if (accessToken !== undefined) {
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/exit`, {
                method: 'POST',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({ roomId, userId: userId }),
                cache: 'no-store'
            });
    
            const result: MessageData = await response.json();
    
            if (result.state) {
                console.log('exitRoom: ' + result.state);
                revalidateTag('chat');
           
                return { data: result.data as ChatRoomData, message: 'SUCCESS' };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } else {
            return { message: ERROR.INVALID_MEMBER };
        }
    
    }
    
}

export async function deleteRoomById(id: string) {

    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        const accessToken = cookies().get('accessToken')?.value;

        if (accessToken !== undefined) {
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/delete`, {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: AuthorizeHeader(accessToken),
                cache: 'no-store'
            });
    
            const result: MessageData = await response.json();
    
            if (result.state) {
                console.log(result.state);
                //revalidatePath(`/?chat=true&setting=true`);
                //revalidateTag('chat');

                return { message: 'SUCCESS' };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } else {
            return { message: ERROR.INVALID_MEMBER };
        }
    
    }
    
}

export async function saveMessage(roomId: string, prevState: MessageState, formData: FormData) {
    const checkResposnse =await checkTokenExist();
   
    if(checkResposnse?.message==='LOGOUT'){
        return {message:ERROR.INVALID_MEMBER};
    }else if(checkResposnse?.status===500 || checkResposnse?.status===401){
        return {message:ERROR.INVALID_MEMBER};
    }else{
        if (formData.get('message')?.toString() === '' || roomId === '') {
            console.log('saveMessage: ' + ERROR.INVALID_INPUT);
            return { message: ERROR.INVALID_INPUT };
        }
    
        const accessToken = cookies().get('accessToken')?.value;
    
        if (accessToken === undefined) {
            return { message: ERROR.INVALID_MEMBER };
        }
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.CHAT}/save`, {
                method: 'POST',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({
                    roomId,
                    senderId: cookies().get('userId')?.value,
                    senderName: cookies().get('name')?.value,
                    message: formData.get('message')?.toString()
                }),
                cache: 'no-store'
            })
            console.log('saveMessage: '+JSON.stringify(response));
            
            const result: MessageData = await response.json();
            console.log('saveMessage result: ' + JSON.stringify(result));
    
            if (result.state) {
                return { message: 'SUCCESS' }
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
    
        } catch (err) {
            return { message: ERROR.SERVER_ERROR };
        }
    }
    
}

export async function findChatByRoomId({
    pageParam = 0, roomId, createdAt
}: {
    pageParam: number, roomId: string, createdAt: string
}) {
    console.log('findChatByRoomId: ', createdAt);

    let chats: ChatData[] = [];

    const accessToken = cookies().get('accessToken')?.value;

    if (accessToken === undefined) {
        useChatAlertStore.setState({
            fadeOut: true,
            message: ERROR.INVALID_MEMBER
        })
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.CHAT}/find-by?roomId=${roomId}&field=lt,createdAt&value=${'2024-07-31T10:03:53.692'}&size=5&page=${pageParam}`, {
            method: 'GET',
            headers: AuthorizeHeader(accessToken),
            cache: 'no-store'
        })

        const data: MessageData = await response.json();
        console.log(JSON.stringify(data));

        if (data.count !== 0) {
            chats = data.data as ChatData[];
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
        console.log('findChatByRoomId error: ' + err);
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
