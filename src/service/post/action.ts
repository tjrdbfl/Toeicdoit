"use server";
import { I_ApiPostReplyRequest } from "@/app/api/post/reply/route";
import { I_ApiBoardDeleteRequest, I_ApiPostRequest } from "@/app/api/post/route";
import { CommonHeader } from "@/config/headers";
import { PostReplySchema, PostSaveSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCookie, setCookie } from 'cookies-next';

export async function createPost(prevState: { message: string },
    formData: FormData
) {

    const parse = PostSaveSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }


    const rawFormData: I_ApiPostRequest = parse.data;

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

export async function modifyPost(prevState: { message: string },
    formData: FormData
) {

    const parse = PostSaveSchema.safeParse({
        id: formData.get('id'),
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }

    const rawFormData: I_ApiPostRequest = parse.data;

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
export async function deletePost(boardId:number,type:string) {

    
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

    const parse = PostReplySchema.safeParse({
        writer: formData.get('writer'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }


    const rawFormData: I_ApiPostReplyRequest = parse.data;

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