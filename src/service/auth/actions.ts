"use server";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { LoginMessageState } from "@/templates/auth/LoginForm";
import { UploadMessage } from "@/templates/auth/ProfileForm";
import { RegisterMessageState } from "@/templates/auth/RegisterForm";
import { MessageData, MessageState, PayloadData } from "@/types/MessengerData";
import { LoginSchema, ModifyPasswordSchema, ModifyUserInfoSchema, RegisterSchema } from "@/types/schemas";
import { I_ApiUserLoginRequest, I_ApiUserRegisterRequest, UserDataPublic } from "@/types/UserData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { extractCookie } from "../utils/extract";
import { PG } from "@/constants/enums/PG";
import { jwtDecode } from "jwt-decode";
import { UserInfoMessage } from "@/templates/auth/UserInfoForm";
import { checkTokenExist } from "../utils/token";
import { ModifyPasswordMessageState } from "@/templates/auth/PasswordModifyForm";
import { getSubscribeInfo } from "../calendar/actions";

export async function login(prevState: LoginMessageState, formData: FormData): Promise<LoginMessageState> {

    console.log('-------------login-----------');
    const existAccessToken=cookies().get('accessToken')?.value;

    if(existAccessToken!==undefined || existAccessToken!==undefined){
        return { ...prevState, result_message: ERROR.EXIST_MEMBER };
    }

    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        console.log('LoginSchema: ' + JSON.stringify(validatedFields.error.flatten().fieldErrors));
        return { ...prevState, message: validatedFields.error.flatten().fieldErrors };
    }
    const data: I_ApiUserLoginRequest = {
        email: validatedFields.data.email,
        password: validatedFields.data.password
    }

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/login/local`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(data),
            cache: 'no-store'
        })

        console.log('response: ' + JSON.stringify(response.status));

        if (response.status === 200) {
            const cookieAccessString = response.headers.getSetCookie()[0];
            const cookieRefreshString = response.headers.getSetCookie()[1];

            cookies().set({
                name: 'accessToken',
                value: extractCookie(cookieAccessString, 'accessToken'),
                path: '/',
                maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
                expires: new Date(extractCookie(cookieAccessString, 'Expires')),
                sameSite: 'lax',
                httpOnly: true,
            });

            cookies().set({
                name: 'refreshToken',
                value: extractCookie(cookieRefreshString, 'refreshToken'),
                maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
                expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
                path: '/',
                sameSite: 'lax',
                httpOnly: true
            });

            const payload = jwtDecode<PayloadData>(cookieAccessString);

            if (payload !== undefined) {

                cookies().set({
                    name: 'email',
                    value: payload.sub,
                    maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
                    expires: new Date(extractCookie(cookieAccessString, 'Expires')),
                    sameSite: 'lax',
                    httpOnly: true
                });

                cookies().set({
                    name: 'roles',
                    value: payload.roles[0],
                    maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
                    expires: new Date(extractCookie(cookieAccessString, 'Expires')),
                    sameSite: 'lax',
                    httpOnly: true
                });

                cookies().set({
                    name: 'userId',
                    value: payload.id.toString(),
                    maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
                    expires: new Date(extractCookie(cookieAccessString, 'Expires')),
                    sameSite: 'lax',
                    httpOnly: true
                });

                const accessToken = cookies().get('accessToken')?.value;

                const attendanceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TX}/${SERVER_API.CALENDAR}/add`, {
                    method: 'POST',
                    headers: AuthorizeHeader(accessToken),
                    body: JSON.stringify({
                        "title": "출석",
                        "isAllDay": true,
                        "userId": payload.id.toString(),
                        "startTime": new Date(),
                        "endTime": new Date(),
                    }),
                    cache: 'no-store'
                });


                const responseSubscribe = await getSubscribeInfo();

                console.log('getSubscribeInfo: ' + responseSubscribe.message + responseSubscribe.data);

                if (responseSubscribe?.message === 'SUCCESS') {
                    const subscribe = responseSubscribe.data === undefined ? false : responseSubscribe.data;

                    cookies().set({
                        name: 'payment',
                        value: subscribe ? 'true' : 'false',
                        maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
                        expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
                        sameSite: 'lax',
                        httpOnly: true,
                        path: '/'
                    });

                    console.log('payment: ' + cookies().get('payment')?.value);

                } else {
                    console.log(ERROR.SERVER_ERROR);
                }

                const userId = cookies().get('userId')?.value;
                console.log('userId: ' + userId);

                const userInfoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/find-by-id?id=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                console.log('userInfoResponse: '+userInfoResponse.status);
                const userInfoResult: MessageData = await userInfoResponse.json();

                console.log('findUserInfoById: ' + JSON.stringify(userInfoResult));


                if (userInfoResult.state) {
                    const userInfo = userInfoResult.data as UserDataPublic;

                    if (userInfo.name !== undefined) {
                        cookies().set({
                            name: 'name',
                            value: userInfo.name,
                            maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
                            expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
                            sameSite: 'lax',
                            httpOnly: true,
                            path: '/'
                        });
                    }

                    if (userInfo.toeicLevel !== undefined) {
                        cookies().set({
                            name: 'toeicLevel',
                            value: userInfo.toeicLevel.toString(),
                            maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
                            expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
                            sameSite: 'lax',
                            httpOnly: true,
                            path: '/'
                        });
                    }

                    if (userInfo.profile !== undefined) {

                        cookies().set({
                            name: 'profile',
                            value: userInfo.profile,
                            maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
                            expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
                            sameSite: 'lax',
                            httpOnly: true,
                            path: '/'
                        });
                    }

                    return { ...prevState, result_message: 'SUCCESS' };
                } else {
                    return { ...prevState, result_message: ERROR.SERVER_ERROR };

                }

            } else {

                return { ...prevState, result_message: ERROR.SERVER_ERROR };
            }


        } else if (response.status === 401) {
            return { ...prevState, result_message: ERROR.INVALID_MEMBER };
        } else if(response.status===404){
            return { ...prevState, result_message: ERROR.INVALID_PASSWORD };
        }else {

            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }

    } catch (err) {
        console.log(err);

        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }
}

export async function register(confirm: boolean, prevState: RegisterMessageState, formData: FormData) {

    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        phone: formData.get('phone'),
    });

    console.log('register: ' + validatedFields.success);
    if (!validatedFields.success) {
        console.log('RegisterSchema: ' + JSON.stringify(validatedFields.error.flatten().fieldErrors));
        return { ...prevState, message: validatedFields.error.flatten().fieldErrors };
    }
    const data: I_ApiUserRegisterRequest = {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        phone: validatedFields.data.phone,
        name: validatedFields.data.name
    }
    console.log('Received form data: ', data);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.REGISTER}/local`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(data),
            cache: 'no-store'
        })
        const result: MessageData = await response.json();
        console.log(JSON.stringify(result));

        if (result.state) {
            console.log('ssssss');
            return { ...prevState, result_message: 'SUCCESS' };
        } else {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }
    } catch (err) {

        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }
    //}

}

export async function logout() {

    console.log('logout');

    try {
        const accessToken = cookies().get('accessToken')?.value;
        
        if (accessToken !== undefined) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/logout`, {
                method: 'POST',
                headers: AuthorizeHeader(accessToken),
                cache: 'no-store'
            });

            console.log('response logout: ' + JSON.stringify(response.status));
            console.log('response logout: ' + JSON.stringify(response.statusText));

            if (response.status === 200) {

                cookies().delete('accessToken');
                cookies().delete('refreshToken');
                cookies().delete('email');
                cookies().delete('roles');
                cookies().delete('userId');
                cookies().delete('name');
                cookies().delete('toeicLevel');
                cookies().delete('profile');
                cookies().delete('SESSION');
                cookies().delete('payment');

                return { message: 'SUCCESS' };
            } else {
                cookies().delete('accessToken');
                cookies().delete('refreshToken');
                cookies().delete('email');
                cookies().delete('roles');
                cookies().delete('userId');
                cookies().delete('name');
                cookies().delete('toeicLevel');
                cookies().delete('profile');
                cookies().delete('SESSION');

                return { message: ERROR.SERVER_ERROR };
            }

        }

    } catch (err) {
        return { message: ERROR.SERVER_ERROR };
    }

}


export async function findUserInfoById() {

    console.log('-------------findUserInfoById----------');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        try {
            const accessToken = cookies().get('accessToken')?.value;

            const userId = cookies().get('userId')?.value;

            if (userId !== undefined && accessToken !== undefined) {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/find-by-id?id=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                if (result.state) {
                    const user = result.data as UserDataPublic;

                    return {
                        data: {
                            email: user.email,
                            phone: user.phone,
                            name: user.name,
                            profile: user.profile,
                            toeicLevel: user.toeicLevel,
                        }, status: 200
                    };
                }
                else {
                    return { message: ERROR.SERVER_ERROR };
                }

            }

        } catch (err) {
            return { status: 500 };
        }

    }

}

export async function deleteByUserId() {

    console.log('deleteByUserId');

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        try {
            const accessToken = cookies().get('accessToken')?.value;

            const userId = cookies().get('userId')?.value;

            if (userId !== undefined && accessToken !== undefined) {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/delete?id=${cookies().get('userId')?.value}`, {
                    method: 'DELETE',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                console.log('response: '+response.status);

                const result: MessageData = await response.json();
                console.log('deleteByUserId: ' + JSON.stringify(result));

                if (result.state) {
                    const logoutResponse = await logout();
                    console.log('logoutResponse: ' + JSON.stringify(logoutResponse));

                    if (logoutResponse?.message === 'SUCCESS') {
                        return { message: 'SUCCESS' };
                    } else {
                        return { message: ERROR.SERVER_ERROR };
                    }

                } else {
                    return { message: ERROR.SERVER_ERROR };
                }


            } else {
                return { message: ERROR.INVALID_MEMBER };
            }

        } catch (err) {
            return { message: ERROR.SERVER_ERROR };
        }

    }

}

export async function existByEmail(email: string | undefined) {

    if (email === undefined) {
        return { message: ERROR.INVALID_INPUT };
    } else {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.REGISTER}/exist-by-email?email=${email}`, {
                method: 'GET',
                headers: CommonHeader,
                cache: 'no-store'
            });

            const result: MessageData = await response.json();
            console.log('existByEmail: ' + JSON.stringify(result));

            if (result.state) {
                return { message: 'SUCCESS' };
            } else {
                return { message: 'FAILURE' };
            }

        } catch (err) {
            return { message: ERROR.SERVER_ERROR };
        }
    }

}


export async function uploadFiles(prevState: UploadMessage, formData: FormData) {

    console.log('uploadFiles');

    const file = formData.get('profile') as File;
    console.log('rawFormData: ' + JSON.stringify(file));

    if (!file) {
        return { ...prevState, message: ERROR.INVALID_INPUT };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('buffer: ' + JSON.stringify(buffer));

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;

        if (accessToken !== undefined) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/modify`, {
                    method: 'POST',
                    body: JSON.stringify(buffer),
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store',
                });

                const result: MessageData = await response.json();
                if (result.message === 'SUCCESS') {
                    revalidatePath(`${PG.USER_INFO}`);
                    return { ...prevState, message: 'SUCCESS' };
                } else {
                    return { ...prevState, message: ERROR.SERVER_ERROR };
                }
            } catch (err) {
                return { ...prevState, message: ERROR.SERVER_ERROR };
            }
        } else {
            return { ...prevState, message: ERROR.INVALID_MEMBER };
        }

    }

}

export async function modifyUserInfo(prevState: UserInfoMessage, formData: FormData) {

    console.log('modifyUserInfo');

    const validatedFields = ModifyUserInfoSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
    })
    const rawFormData = {
        name: formData.get('name')?.toString(),
        phone: formData.get('phone')?.toString(),
    }

    console.log('modifyUserInfo: ' + validatedFields.success);

    if (!validatedFields.success) {
        console.log('ModifyUserInfoSchema: ' + JSON.stringify(validatedFields.error.flatten().fieldErrors));
        return { ...prevState, message: validatedFields.error.flatten().fieldErrors, result_message: ERROR.INVALID_INPUT };
    }

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { result_message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { result_message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (accessToken !== undefined && userId !== undefined) {
            const email = cookies().get('email')?.value;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/modify-by-name-phone`, {
                method: 'PUT',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({
                    id: userId,
                    email: email,
                    name: rawFormData.name,
                    phone: rawFormData.phone
                }),
                cache: 'no-store'
            });

            const result: MessageData = await response.json();

            console.log('modifyUserInfo: ' + JSON.stringify(result));

            if (result.state) {
                
                const cookieRefreshString = cookies().get('refreshToken')?.value;

                if (cookieRefreshString !== undefined) {
                    cookies().delete('name');

                    cookies().set({
                        name: 'name',
                        value: formData.get('name')?.toString() || '',
                        maxAge: 3600, // 1 hour
                        expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                        sameSite: 'lax',
                        httpOnly: true,
                        path: '/'
                    });

                }

                console.log('name: ' + cookies().get('name')?.value);
                revalidatePath(`${PG.USER_INFO}`);
                return { ...prevState, result_message: 'SUCCESS' };
            } else {
                return { ...prevState, result_message: ERROR.SERVER_ERROR };
            }
        } else {
            return { ...prevState, result_message: ERROR.INVALID_MEMBER };
        }
    }


}

export async function modifyByPassword(prevState: ModifyPasswordMessageState, formData: FormData) {

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { ...prevState, result_message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;
        const userId = cookies().get('userId')?.value;


        if (accessToken === undefined || userId === undefined) {
            return { ...prevState, result_message: ERROR.INVALID_MEMBER };
        } else {
            const validatedFields = ModifyPasswordSchema.safeParse({
                email: formData.get('email'),
                password: formData.get('password'),
                newPassword: formData.get('newPassword'),
            });

            console.log('modifyByPassword: ' + validatedFields.success);

            if (!validatedFields.success) {
                console.log('modifyByPasswordSchema: ' + JSON.stringify(validatedFields.error.flatten().fieldErrors));
                return { ...prevState, message: validatedFields.error.flatten().fieldErrors, result_message: ERROR.INVALID_INPUT };
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/modify-by-password?email=${formData.get('email')?.toString()}&oldPassword=${formData.get('password')?.toString()}&newPassword=${formData.get('newPassword')?.toString()}`, {
                    method: 'PUT',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                console.log('modifyByPassword: ' + response.status);

                if (response.status === 401) {
                    return { ...prevState, result_message: ERROR.INVALID_MEMBER };
                } else if (response.status === 200) {
                    const result: MessageData = await response.json();
                    console.log('modifyByPassword result:' + JSON.stringify(result));

                    if (result.state) {
                        return { ...prevState, result_message: 'SUCCESS' };
                    } else {
                        return { ...prevState, result_message: ERROR.SERVER_ERROR };
                    }
                } else {
                    return { ...prevState, result_message: ERROR.SERVER_ERROR };
                }
            } catch (err) {
                return { ...prevState, result_message: ERROR.SERVER_ERROR };
            }

        }
    }




}

export async function findByNameProfile(userList: number[]) {

    console.log('findByNameProfile');

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { result_message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { result_message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;

        if (userList.length === 0) {
            return { message: ERROR.INVALID_INPUT };
        }

        try {

            console.log(JSON.stringify(userList));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/user/find-by-name-profile`, {
                method: 'POST',
                headers: AuthorizeHeader(accessToken),
                body: JSON.stringify({
                    "id": userList
                }),
                cache: 'no-store',
            })

            console.log('findByNameProfile: ' + response.status);

            const result:MessageData = await response.json();

            if (result.state) {
            
                return { message: 'SUCCESS', data: result.data as {
                    userId:number,
                    name:string,
                    profile:string,
                }[] };
            } else {
                return { message: ERROR.SERVER_ERROR };
            }
        } catch (err) {
            console.log('findByNameProfile: ' + err);

            return { message: ERROR.SERVER_ERROR };
        }


    }
}
