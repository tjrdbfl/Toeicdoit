"use server";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { FreeReplySchema, FreeSaveSchema } from "@/types/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCookie, setCookie } from 'cookies-next';
import { SERVER, SERVER_API } from "@/constants/enums/API";
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
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else {

        const validatedFields = FreeSaveSchema.safeParse({
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            type: formData.get('type')
        })

        console.log('validatedFields: ' + validatedFields.data?.type);

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

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.BOARD}/save`, {
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

                if (result.state && formData.get('type') === 'free') {
                    revalidatePath(`${PG.FREE}`);
                    return { ...prevState, result_message: 'SUCCESS' };
                } else if (result.state && formData.get('type') === 'request') {
                    return { ...prevState, result_message: 'SUCCESS' };
                }
                else {
                    return { ...prevState, result_message: ERROR.SERVER_ERROR };
                }
            }

        } catch (err) {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }
    }

}

export async function modifyBoard(prevState: FreeMessageState, formData: FormData) {
    console.log('modifyBoard');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else {
        const boardId = formData.get('boardId')?.toString();

        if (boardId === '') {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }

        const validatedFields = FreeSaveSchema.safeParse({
            category: formData.get('category'),
            title: formData.get('title'),
            content: formData.get('content'),
            type: formData.get('type')
        })

        if (!validatedFields.success) {
            console.log('saveBoard' + JSON.stringify(validatedFields.error.flatten().fieldErrors))
            return { ...prevState, message: validatedFields.error.flatten().fieldErrors };
        }

        try {
            const accessToken = cookies().get('accessToken')?.value;

            console.log(validatedFields.data.type);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.BOARD}/modify`, {
                method: 'PUT',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({
                    id: boardId,
                    category: validatedFields.data.category,
                    title: validatedFields.data.title,
                    content: validatedFields.data.content,
                    type: validatedFields.data.type
                }),
                cache: 'no-store'
            });

            const result: MessageData = await response.json();

            console.log(JSON.stringify(result));

            if (result.state) {
                return { ...prevState, result_message: 'SUCCESS' };
            } else {
                return { ...prevState, result_message: ERROR.SERVER_ERROR.toString() };
            }
        } catch (err) {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }

    }

}

export async function deleteBoard(boardId: number) {
    console.log('deleteBoard');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        if (boardId === 0) {
            console.log('boardId is null: ' + boardId);
            return { message: ERROR.INVALID_INPUT }
        } else {
            try {
                const accessToken = cookies().get('accessToken')?.value;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.BOARD}/delete?id=${boardId}`, {
                    method: 'DELETE',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                if (result.state) {
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

export async function saveReply(boardId: number, page: number, prevState: MessageState, formData: FormData) {
    console.log('saveReply');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken === undefined || userId === undefined) {
            return { message: ERROR.INVALID_MEMBER };
        } else {

            const content = formData.get('content')?.toString();

            console.log('content: ' + content + ", boardId: " + boardId);

            if (content === undefined || boardId === undefined) {
                return { message: ERROR.INVALID_INPUT };
            } else {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.REPLY}/save`, {
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
                    if (result) {
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

export async function deleteReply(replyId: number, boardId: number) {
    console.log('deleteReply');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken === undefined || userId === undefined) {
            return { message: ERROR.INVALID_MEMBER };
        } else {

            if (replyId === undefined || boardId === undefined) {
                return { message: ERROR.INVALID_INPUT };
            } else {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.REPLY}/delete?id=${replyId}`, {
                        method: 'DELETE',
                        cache: 'no-store',
                        headers: AuthorizeHeader(accessToken)
                    })

                    const result: MessageData = await response.json();

                    console.log('saveReply: ' + JSON.stringify(result));
                    if (result.message === 'SUCCESS') {
                        revalidatePath(`${PG.INQUIRY_DETAILS}/modify/reply/${boardId}`);

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

export async function modifyReply(boardId: number, prevState: MessageState, formData: FormData) {
    console.log('modifyReply');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken === undefined || userId === undefined) {
            return { message: ERROR.INVALID_MEMBER };
        } else {
            const replyId = formData.get('replyId')?.toString();
            const content = formData.get('content')?.toString();
            if (replyId === undefined || content === undefined) {
                return { message: ERROR.INVALID_INPUT };
            } else {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.REPLY}/modify-by-content`, {
                        method: 'PUT',
                        cache: 'no-store',
                        headers: AuthorizeHeader(accessToken),
                        body: JSON.stringify({
                            id: replyId,
                            content: content
                        })
                    })

                    const result: MessageData = await response.json();

                    console.log('saveReply: ' + JSON.stringify(result));
                    if (result.message === 'SUCCESS') {
                        revalidatePath(`${PG.INQUIRY_DETAILS}/modify/reply/${boardId}`);
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

export async function findByBoard(currentPage: number, type: string) {

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken === undefined || userId === undefined) {
            return { status: 401 };
        } else {

            let typeURL = '';
            if (type !== 'all') {
                typeURL = `&type=${type}`
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.BOARD}/findBy?page=${currentPage - 1}&size=10&userId=${userId}${typeURL}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                const data: I_ApiBoardResponse = await response.json();

                if (data) {
                    return {
                        status: 200, data: {
                            boards: data.content,
                            totalPages: data.totalPages,
                            totalElements: data.totalElements,
                        }
                    }
                } else {
                    return { status: 500 };
                }


            } catch (err) {
                return { status: 500 };
            }

        }

    }
}
export async function findAllReplyByUserId() {
    console.log('findAllReplyByUserId');

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken === undefined || userId === undefined) {
            return { status: 401 };
        } else {
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.REPLY}/find-all-by-userId?userId=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store',
                })

                console.log('findAllReplyByUserId: '+response.status);

                const result: MessageData = await response.json();

                if (result.state) {
                    return { status: 200, data: result.data as ReplyData[] };
                }
                else {
                    return { status: 500 };
                }

            } catch (err) {
                return { status: 500 };
            }
        }
    }

}