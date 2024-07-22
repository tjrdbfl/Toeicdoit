'use server';

import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { MessageState } from "@/types/MessengerData";
import { revalidatePath } from "next/cache";

export async function handleSaveCalendar(prevState:MessageState,formData:FormData){
    
    const validatedFields=formData.get('title')?.toString();

    
    const response=await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.CALENDAR}/save`,{
        method:'POST',
        headers:CommonHeader,
        body:JSON.stringify(validatedFields),
        cache:'no-store'
    });

    const result:string=await response.json();

    if(result==='SUCCESS'){
        revalidatePath(`${PG.CALENDAR}`);
        return {message:'SUCCESS'}
    }else if(result==='FAIL'){
        return {message:"FAIL"};
    }else{
        return {message:ERROR.SERVER_ERROR};
    }

}
