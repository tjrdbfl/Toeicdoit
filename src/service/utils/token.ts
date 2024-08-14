'use server';
import { MessageData, PayloadData } from "@/types/MessengerData";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { extractCookie } from "./extract";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { NextResponse } from "next/server";
import { ERROR } from "@/constants/enums/ERROR";
import { logout } from "../auth/actions";
import { getSubscribeInfo } from "../calendar/actions";
import { UserDataPublic } from "@/types/UserData";

export async function hashPassword(password: string): Promise<string> {
    const salt = CryptoJS.lib.WordArray.random(128 / 8); // 128비트 솔트 생성
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32, // 256비트 키 생성
        iterations: 10000 // 반복 횟수 (보안 강도 조절)
    });

    const hash = CryptoJS.SHA256(key).toString(); // SHA-256 해싱
    return hash + '.' + salt; // 해시 값과 솔트를 함께 저장
}

export async function verifyPassword(password: string, hashWithSalt: string): Promise<boolean> {
    const [hash, salt] = hashWithSalt.split('.');
    const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(salt), {
        keySize: 256 / 32,
        iterations: 10000
    });
    const newHash = CryptoJS.SHA256(key).toString();

    return hash === newHash;
}

export async function checkTokenExist() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken === undefined && refreshToken !== undefined) {
        if (refreshToken === undefined) {
            console.log('checkTokenExist: logout');
            logout();

            return { message: 'LOGOUT' };
        } else {
            console.log('checkTokenExist: getAccessToken');

            const response = await getAccessToken(refreshToken);

            if (response?.status === 200) {
                return { status: 200 };
            } else if (response?.status === 401) {
                return { status: 401 };
            } else {
                return { message: 500 };
            }
        }

    } else if (accessToken !== undefined && refreshToken !== undefined) {
        return { status: 200 };
    }
}

export async function getAccessToken(token: string) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/refresh`, {
            method: 'POST',
            headers: AuthorizeHeader(token),
            cache: 'no-store',
        });

        console.log('getAccessToken: ' + response.status);

        if (response.status === 401) {
            return { status: 401 };
        }
        else if (response.status === 200) {
            const cookieAccessString = response.headers.getSetCookie()[0];

            cookies().set({
                name: 'accessToken',
                value: extractCookie(cookieAccessString, 'accessToken'),
                path: '/',
                maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
                expires: new Date(extractCookie(cookieAccessString, 'Expires')),
                sameSite: 'lax',
                httpOnly: true,
            });


            const payload = jwtDecode<PayloadData>(cookieAccessString);

            console.log('payload.id.toString(): ' + JSON.stringify(payload));

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

            }

            console.log('getAccessToken cookie: ' + cookies().get('accessToken')?.value);
            console.log('getAccessToken cookie: ' + cookies().get('userId')?.value);
            console.log('getAccessToken cookie: ' + cookies().get('roles')?.value);
            console.log('getAccessToken cookie: ' + cookies().get('email')?.value);

            return { status: 200 };
        }

    } catch (err) {
        return { status: 500 };
    }

}
export async function getUserIdInCookie() {

    const checkResposnse = await checkTokenExist();

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 200) {
        return { message: 'SUCCESS', data: cookies().get('userId')?.value };
    } else {
        return { message: ERROR.SERVER_ERROR };
    }

}

export async function getUserInfoInCookie() {

    const userId = cookies().get('userId')?.value;

    if (userId === undefined) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        console.log('getUserInfoInCookie: ' + cookies().get('name')?.value);
        return {
            message: 'SUCCESS', data: {
                name: cookies().get('name')?.value,
                toeicLevel: cookies().get('toeicLevel')?.value,
                profile: cookies().get('profile')?.value,
                email: cookies().get('email')?.value
            }
        };

    }

}

export async function setCookie() {
    console.log('setCookie');

    const accessToken = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value;

    console.log('oauth accessToken: ' + JSON.stringify(cookies().get('accessToken')));

    if (accessToken === undefined || refreshToken === undefined) {
        return { status: 500 };
    } else {
        const payload = jwtDecode<PayloadData>(accessToken);

        console.log('oauth payload: ' + JSON.stringify(payload));

        if (payload !== undefined) {

            cookies().set({
                name: 'email',
                value: payload.sub,
                maxAge: 3600, // 1 hour
                expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                sameSite: 'lax', // Or 'none' with 'Secure' if using HTTPS
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure secure only in production
                path: '/'
            });

            cookies().set({
                name: 'roles',
                value: payload.roles[0],
                maxAge: 3600, // 1 hour
                expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                sameSite: 'lax', // Or 'none' with 'Secure' if using HTTPS
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure secure only in production
                path: "/"
            });

            cookies().set({
                name: 'userId',
                value: payload.id.toString(),
                maxAge: 3600, // 1 hour
                expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                sameSite: 'lax', // Or 'none' with 'Secure' if using HTTPS
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure secure only in production
                path: '/'
            });

            console.log('userId: ' + cookies().get('userId')?.value);

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
                    maxAge: 3600, // 1 hour
                    expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                    sameSite: 'lax',
                    httpOnly: true,
                    path: '/'
                });

                console.log('payment: ' + cookies().get('payment')?.value);

            } else {
                console.log(ERROR.SERVER_ERROR);
            }

            const userId=cookies().get('userId')?.value;
            const userInfoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/${SERVER_API.USER}/find-by-id?id=${userId}`, {
                method: 'GET',
                headers: AuthorizeHeader(accessToken),
                cache: 'no-store'
            });

            const userInfoResult: MessageData = await userInfoResponse.json();

            console.log('findUserInfoById: ' + JSON.stringify(userInfoResult));

            if (userInfoResult.state) {
                const userInfo = userInfoResult.data as UserDataPublic;

                if (userInfo.name !== undefined) {
                    cookies().set({
                        name: 'name',
                        value: userInfo.name,
                        maxAge: 3600, // 1 hour
                        expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                         sameSite: 'lax',
                        httpOnly: true,
                        path: '/'
                    });
                }

                if (userInfo.toeicLevel !== undefined) {
                    cookies().set({
                        name: 'toeicLevel',
                        value: userInfo.toeicLevel.toString(),
                        maxAge: 3600, // 1 hour
                        expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                        sameSite: 'lax',
                        httpOnly: true,
                        path: '/'
                    });
                }

                if (userInfo.profile !== undefined) {

                    cookies().set({
                        name: 'profile',
                        value: userInfo.profile,
                        maxAge: 3600, // 1 hour
                        expires: new Date(Date.now() + 3600 * 1000), // 1 hour from now
                        sameSite: 'lax',
                        httpOnly: true,
                        path: '/'
                    });
                }

                return { status: 200 };
            } else {
                return { status: 500 };
            }


        } else {
            return { status: 500 };
        }

    }

}