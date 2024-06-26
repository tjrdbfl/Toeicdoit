"use server";
import { I_ApiPostReplyRequest } from "@/app/api/post/reply/route";
import { I_ApiPostWriteRequest } from "@/app/api/post/write/route";
import { CommonHeader } from "@/config/headers";
import { PostReplySchema, PostWriteSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: { message: string },
    formData: FormData
) {

    const parse = PostWriteSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        content: formData.get('content')
    })


    if (!parse.success) {
        return { message: "Failed to create todo" };
    }


    const rawFormData: I_ApiPostWriteRequest = parse.data;

    console.log('Received form data: ', rawFormData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/post/write`, {
        method: 'POST',
        headers: CommonHeader,
        body: JSON.stringify(rawFormData),
        cache: 'no-store'
    });

    if (!response.ok) {
        return { message: '네트워크 오류 : 다시 제출해주세요.' };
    }

    revalidateTag('posts'); // Update cached posts
    redirect(`/post`); // Navigate to the new post page
}
export async function createReply(prevState: { message: string },
    formData: FormData,currentPath:string
) {

    const parse = PostReplySchema.safeParse({
        writer:formData.get('writer'),
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