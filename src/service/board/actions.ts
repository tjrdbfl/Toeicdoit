"use server";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { FreeReplySchema, FreeSaveSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCookie, setCookie } from 'cookies-next';
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { MessageData, FreeMessageState, MessageState } from "@/types/MessengerData";
import { checkTokenExist } from "../utils/token";
import { PG } from "@/constants/enums/PG";
import { cookies } from "next/headers";
import { I_ApiBoardResponse, ReplyData } from "@/types/BoardData";


export async function saveBoard(prevState: FreeMessageState, formData: FormData) {

    console.log('saveBoard');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return {  ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else {
        const validatedFields = FreeSaveSchema.safeParse({
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            type: formData.get('type')
        })

        if (!validatedFields.success) {
            console.log('saveBoard' + JSON.stringify(validatedFields.error.flatten().fieldErrors))
            return { ...prevState, message: validatedFields.error.flatten().fieldErrors };
        }

        try {
            const accessToken = cookies().get('accessToken')?.value;
            const userId = cookies().get('userId')?.value

            if (accessToken === undefined || userId === undefined) {
                return { ...prevState, result_message: ERROR.INVALID_MEMBER };
            } else {

                const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/save`, {
                    method: 'POST',
                    headers: AuthorizeHeader(accessToken),
                    body: JSON.stringify({
                        category: validatedFields.data.category,
                        title: validatedFields.data.title,
                        content: validatedFields.data.content,
                        type: validatedFields.data.type,
                        userId: userId
                    }),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                console.log(JSON.stringify(result));

                if (result.message === 'SUCCESS') {
                    return { ...prevState, result_message: 'SUCCESS' };
                } else {
                    return { ...prevState, result_message: ERROR.SERVER_ERROR };
                }
            }

        } catch (err) {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }
    }

}

export async function modifyBoard(prevState: FreeMessageState, formData: FormData) {

    const boardId = formData.get('boardId')?.toString();

    if (boardId === '') {
        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }

    const validatedFields = FreeSaveSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!validatedFields.success) {
        console.log('saveBoard' + JSON.stringify(validatedFields.error.flatten().fieldErrors))
        return { ...prevState, message: validatedFields.error.flatten().fieldErrors };
    }


    const rawFormData = {
        id: boardId,
        category: validatedFields.data.category,
        title: validatedFields.data.title,
        content: validatedFields.data.content,
    };
    // const rawFormData: I_ApiBoardRequest = {
    //     category:validatedFields.data.category,
    //     title:validatedFields.data.title,
    //     content:validatedFields.data.content,
    //     type:'자유',
    //     userId:1
    // };

    console.log('Received form data: ', rawFormData);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/modify`, {
            method: 'PUT',
            headers: CommonHeader,
            body: JSON.stringify(rawFormData),
            cache: 'no-store'
        });

        const result: MessageData = await response.json();

        console.log(JSON.stringify(result));

        if (result.message === 'SUCCESS') {
            console.log('result.message: ' + result.message);
            revalidatePath('/inquiry-details');
            revalidatePath(`/inquiry-details/modify/${boardId}`);

            return { ...prevState, result_message: 'SUCCESS' };
        } else {
            return { ...prevState, result_message: ERROR.SERVER_ERROR.toString() };
        }
    } catch (err) {
        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }

}
export async function deleteFree(boardId: number, type: string) {


    console.log('boardId: ', boardId);
    console.log('type: ', type);

    if (!boardId || !type) {
        setCookie('deleteErrorMessage', '삭제할 문의 내역을 선택해주세요.', { maxAge: 5 });
    }

    const token = getCookie('accessToken');
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

export async function deleteBoard(boardId: number) {

    if (boardId === 0) {
        console.log('boardId is null: ' + boardId);
        return { message: ERROR.INVALID_INPUT }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/delete?id=${boardId}`, {
            method: 'DELETE',
            headers: CommonHeader,
            cache: 'no-store'
        });

        const result: MessageData = await response.json();
        if (result.message === 'SUCCESS') {
            console.log('result.message: ' + result.message);
            revalidatePath(`/inquiry-details`);
            return { message: 'SUCCESS' };
        } else {
            return { message: ERROR.SERVER_ERROR };
        }

    } catch (err) {
        return { message: ERROR.SERVER_ERROR };
    }
}

export async function saveReply(boardId: number, page: number, prevState: MessageState, formData: FormData) {
    console.log('saveReply');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken=cookies().get('accessToken')?.value;
        const userId=cookies().get('userId')?.value;

        if(accessToken===undefined || userId===undefined){
            return {message:ERROR.INVALID_MEMBER};
        }else{
            
            const content = formData.get('content')?.toString();

            console.log('content: ' + content + ", boardId: " + boardId);
        
            if (content === undefined || boardId === undefined) {
                return { message: ERROR.INVALID_INPUT };
            }else{
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.REPLY}/save`, {
                        method: 'POST',
                        body: JSON.stringify({
                            content: content,
                            userId: userId,
                            boardId: boardId,
                        }),
                        cache: 'no-store',
                        headers: AuthorizeHeader(accessToken)
                    })
            
                    const result: MessageData = await response.json();
            
                    console.log('saveReply: ' + JSON.stringify(result));
                    if (result.message === 'SUCCESS') {
                        revalidatePath(`${PG.FREE}/${page}`)
                        return { message: 'SUCCESS' };
                    } else {
                        return { message: ERROR.SERVER_ERROR };
                    }
                } catch (err) {
                    return { message: ERROR.SERVER_ERROR };
                }        
            }
    
        }
            
        
    }
}

export async function findByBoard(currentPage:number,type:string){

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken=cookies().get('accessToken')?.value;
        const userId=cookies().get('userId')?.value;

        if(accessToken===undefined || userId===undefined){
            return {status:401};
        }else{

            let typeURL='';
            if(type!=='all'){
                typeURL=`&type=${type}`
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/findBy?page=${currentPage - 1}&size=10&userId=${userId}${typeURL}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache:'no-store'
                });
                
                const data: I_ApiBoardResponse = await response.json();
                
                if (data) {
                    return {status:200,data:{
                        boards:data.content,
                        totalPages:data.totalPages,
                        totalElements:data.totalElements,    
                    }}
                  } else {
                    return {status:500};
                }
        
        
            } catch (err) {
                return {status:500};
            }
                
        }

    }   
}
export async function findAllReplyByUserId(){
    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken=cookies().get('accessToken')?.value;
        const userId=cookies().get('userId')?.value;

        if(accessToken===undefined || userId===undefined){
            return {status:401};
        }else{
            try{
                const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.REPLY}/find-all-by-userId?userId=${userId}`,{
                    method:'GET',
                    headers:AuthorizeHeader(accessToken),
                    cache:'no-store',
                })

                if(response.status===500){
                    return {status:500};
                }else{
                    const result:ReplyData[]=await response.json();
                    
                    return{status:200,data:result};
                }

            }catch(err){
                return {status:500};
            }
        }
    }
    
}