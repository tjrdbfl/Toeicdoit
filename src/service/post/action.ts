"use server";
import { I_ApiFreeReplyRequest } from "@/app/api/free/reply/route";
import { I_ApiBoardDeleteRequest, I_ApiFreeRequest } from "@/app/api/free/route";
import { CommonHeader } from "@/config/headers";
import { FreeReplySchema, FreeSaveSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCookie, setCookie } from 'cookies-next';

export async function createFree(prevState: { message: string },
    formData: FormData
) {

    const parse = FreeSaveSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }


    const rawFormData: I_ApiFreeRequest = parse.data;

    console.log('Received form data: ', rawFormData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/post`, {
        method: 'POST',
        headers: CommonHeader,
        body: JSON.stringify(rawFormData),
        cache: 'no-store'
    });

    if (!response.ok) {
        return { message: '네트워크 오류 : 다시 제출해주세요.' };
    }

    revalidateTag('/posts'); // Update cached posts
    redirect(`/post`); // Navigate to the new post page
}

export async function modifyFree(prevState: { message: string },
    formData: FormData
) {

    const parse = FreeSaveSchema.safeParse({
        id: formData.get('id'),
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }

    const rawFormData: I_ApiFreeRequest = parse.data;

    console.log('Received form data: ', rawFormData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/post`, {
        method: 'PUT',
        headers: CommonHeader,
        body: JSON.stringify(rawFormData),
        cache: 'no-store'
    });

    if (!response.ok) {
        return { message: '네트워크 오류 : 다시 제출해주세요.' };
    }

    revalidateTag('/inquiry-details'); // Update cached posts
    redirect(`/inquiry-details`); // Navigate to the new post page
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

    revalidatePath('/inquiry-details');

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