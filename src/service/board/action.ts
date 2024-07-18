"use server";
import { I_ApiFreeReplyRequest } from "@/app/api/free/reply/route";
import { CommonHeader } from "@/config/headers";
import { FreeReplySchema, FreeSaveSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCookie, setCookie } from 'cookies-next';
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { MessageData, MessageState } from "@/types/MessengerData";
import { I_ApiBoardSaveRequest } from "@/types/BoardData";
import { redirect } from "next/navigation";


export async function saveFree(prevState: MessageState, formData: FormData) {

    const validatedFields = FreeSaveSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })
    
    if (!validatedFields.success) {
        console.log('saveFree'+JSON.stringify(validatedFields.error.flatten().fieldErrors))
        return {...prevState,message:validatedFields.error.flatten().fieldErrors};
    }
    

    const rawFormData: I_ApiBoardSaveRequest = {
        category:validatedFields.data.category,
        title:validatedFields.data.title,
        content:validatedFields.data.content,
        type:'자유',
        userId:1
    };

    console.log('Received form data: ', rawFormData);

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/save`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(rawFormData),
            cache: 'no-store'
        });
    
        const result:MessageData=await response.json();
        
        console.log(JSON.stringify(result));
    
        if(result.message==='SUCCESS'){
            return {...prevState,result_message:'SUCCESS'}; 
        }else{
            return {...prevState,result_message:ERROR.SERVER_ERROR.toString()};
        }
    }catch(err){
        return {...prevState,result_message:ERROR.SERVER_ERROR};
    }
        
}

export async function modifyBoard(prevState: MessageState,formData: FormData) {

    const boardId=formData.get('boardId')?.toString();

    if(boardId===''){
        return {...prevState,result_message:ERROR.SERVER_ERROR};
    }

    const validatedFields = FreeSaveSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })
    
    if (!validatedFields.success) {
        console.log('saveFree'+JSON.stringify(validatedFields.error.flatten().fieldErrors))
        return {...prevState,message:validatedFields.error.flatten().fieldErrors};
    }
    

    const rawFormData = {
        id:boardId,
        category:validatedFields.data.category,
        title:validatedFields.data.title,
        content:validatedFields.data.content,
    };
    // const rawFormData: I_ApiBoardRequest = {
    //     category:validatedFields.data.category,
    //     title:validatedFields.data.title,
    //     content:validatedFields.data.content,
    //     type:'자유',
    //     userId:1
    // };

    console.log('Received form data: ', rawFormData);

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/modify`, {
            method: 'PUT',
            headers: CommonHeader,
            body: JSON.stringify(rawFormData),
            cache: 'no-store'
        });
    
        const result:MessageData=await response.json();
        
        console.log(JSON.stringify(result));
    
        if(result.message==='SUCCESS'){
            console.log('result.message: '+result.message);
            revalidatePath('/inquiry-details');
            revalidatePath(`/inquiry-details/modify/${boardId}`);
            
            return {...prevState,result_message:'SUCCESS'}; 
        }else{
            return {...prevState,result_message:ERROR.SERVER_ERROR.toString()};
        }
    }catch(err){
        return {...prevState,result_message:ERROR.SERVER_ERROR};
    }
    
}
export async function deleteFree(boardId:number,type:string) {

    
    console.log('boardId: ', boardId);
    console.log('type: ', type);

    if (!boardId || !type) {
        setCookie('deleteErrorMessage', '삭제할 문의 내역을 선택해주세요.', { maxAge: 5 });
    }

    const token=getCookie('accessToken');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BOARD_API_URL}/delete?boardId=${boardId}&type=${type}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        setCookie('deleteErrorMessage', '삭제에 실패하셨습니다. 다시 시도해주세요.', { maxAge: 5 }); // 쿠키 설정
    }

    return response;
}
export async function createReply(prevState: { message: string },
    formData: FormData, currentPath: string
) {

    const parse = FreeReplySchema.safeParse({
        writer: formData.get('writer'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }


    const rawFormData: I_ApiFreeReplyRequest = parse.data;

    console.log('Received form data: ', rawFormData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/post/reply`, {
        method: 'POST',
        headers: CommonHeader,
        body: JSON.stringify(rawFormData),
        cache: 'no-store'
    });

    if (!response.ok) {
        return { message: 'Failure' };
    }

    revalidatePath(currentPath);
    return { message: 'Success' };
}
export async function deleteBoard(boardId:number){
    
    if(boardId===0){
        console.log('boardId is null: '+boardId);
        return {message:ERROR.INVALID_INPUT}
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/delete?id=${boardId}`,{
            method:'DELETE',
            headers:CommonHeader,
            cache:'no-store'
        });

        const result:MessageData=await response.json();
        if(result.message==='SUCCESS'){
            console.log('result.message: '+result.message);
            revalidatePath(`/inquiry-details`);   
            return {message:'SUCCESS'};
        }else{
           return {message:ERROR.SERVER_ERROR};
        }

    }catch(err){
       return {message:ERROR.SERVER_ERROR};
    }
}