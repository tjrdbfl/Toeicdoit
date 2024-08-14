'use server';

import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { MessageData, MessageState } from "@/types/MessengerData";
import { IEvent } from "@/types/TransactionData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { checkTokenExist } from "../utils/token";

export async function getCalenderInfoById() {

    console.log('findUserInfoById');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;

        const userId = cookies().get('userId')?.value;

        if (userId !== undefined && accessToken !== undefined) {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TX}/${SERVER_API.CALENDAR}/find-all-by-userId?id=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                if (result.state) {
                    const resultEvent = result.data as IEvent[];

                    const event = resultEvent.map(event => ({
                        id: event.id,
                        userId: userId,
                        allDay: event.allDay,
                        title: event.title,
                        start: event.startTime,
                        end: event.endTime,
                    }));
                    console.log('event: ' + JSON.stringify(event));

                    return { status: 200, data: event };
                } else {
                    return { status: 500 };
                }

            } catch (err) {
                return { status: 500 };
            }
        }else{
            return {status:401, message:ERROR.INVALID_MEMBER};
        }
    }

}

export async function deleteEventById(eventId:number|null){
    console.log('deleteEventById');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {

        if(eventId===null){
            return {message:ERROR.INVALID_INPUT};
        }
        const accessToken = cookies().get('accessToken')?.value;
   
        if(accessToken===undefined){
            return {message:ERROR.INVALID_MEMBER};
        }else{
            try{
                const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TX}/${SERVER_API.CALENDAR}/delete?id=${eventId}`,{
                    method:'DELETE',
                    headers:AuthorizeHeader(accessToken),
                    cache:'no-store'
                })

                const result: MessageData = await response.json();

                console.log('deleteEventById result: '+JSON.stringify(result));
                
                if (result.state) {
                    return {message:'SUCCESS'};
                }else{
                    return {message:ERROR.SERVER_ERROR};
                }
            }catch(err){
                return {message:ERROR.SERVER_ERROR};
            }
           
        }
        
    }

}

export async function saveEventById(event:IEvent){
    console.log('saveEventById: '+JSON.stringify(event));

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {

        const accessToken = cookies().get('accessToken')?.value;
   
        if(accessToken===undefined){
            return {message:ERROR.INVALID_MEMBER};
        }else{
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TX}/${SERVER_API.CALENDAR}/save`, {
                    method: 'POST',
                    headers: AuthorizeHeader(accessToken),
                    body: JSON.stringify([event]),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                console.log('saveEventById result: '+JSON.stringify(result));
                if (result.state) {
                    return {message:'SUCCESS'};
                }else{
                    return {message:ERROR.SERVER_ERROR};
                }
            }catch(err){
                return {message:ERROR.SERVER_ERROR};
            }
           
        }
        
    }

}

export async function getSubscribeInfo(){
    console.log('getSubscribeInfo');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {

        const accessToken = cookies().get('accessToken')?.value;

        const userId=cookies().get('userId')?.value;

        if(accessToken===undefined){
            return {message:ERROR.INVALID_MEMBER};
        }else{
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TX}/${SERVER_API.SUBSCRIBE}/exist-by-userId?userId=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                if(response.status===200){
                    const result:MessageData=await response.json();
                    return {message:'SUCCESS',data:result.state};               
                }else{
                    return {message:ERROR.SERVER_ERROR};      
                }
            
            }catch(err){
                return {message:ERROR.SERVER_ERROR};
            }
           
        }
        
    }

}

