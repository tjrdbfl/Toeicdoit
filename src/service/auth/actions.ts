"use server";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { LoginMessageState } from "@/templates/auth/LoginForm";
import { UploadMessage } from "@/templates/auth/ProfileForm";
import { RegisterMessageState } from "@/templates/auth/RegisterForm";
import { MessageData, PayloadData } from "@/types/MessengerData";
import { LoginSchema, RegisterSchema } from "@/types/schemas";
import { I_ApiUserLoginRequest, I_ApiUserRegisterRequest } from "@/types/UserData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { extractCookie } from "../utils/extract";
import { PG } from "@/constants/enums/PG";
import { jwtDecode } from "jwt-decode";
import { UserInfoMessage } from "@/templates/auth/UserInfoForm";

export async function login(prevState: LoginMessageState, formData: FormData) {

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
            cache:'no-store'
        })

        console.log('response: '+JSON.stringify(response.status));
        if(response.status===200){
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
                return { ...prevState, result_message: 'SUCCESS' };
            } else {
                return { ...prevState, result_message: ERROR.SERVER_ERROR };
            }
            
           
        }else{
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }
        
    } catch (err) {
        console.log(err);
        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }
}

export async function register(prevState: RegisterMessageState, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        phone: formData.get('phone'),
    });
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.AUTH}/join`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(data),
            cache: 'no-store'
        })
        const result: MessageData = await response.json();
        console.log(JSON.stringify(result));
        if (result.message === 'SUCCESS') {
            return { ...prevState, result_message: 'SUCCESS' };
        } else {
            return { ...prevState, result_message: ERROR.SERVER_ERROR };
        }
    } catch (err) {
        console.log(err);
        return { ...prevState, result_message: ERROR.SERVER_ERROR };
    }
}

export async function logout() {

    console.log('logout');

    try{
        const accessToken=cookies().get('accessToken')?.value;
        const refreshToken=cookies().get('refreshToken')?.value;
        
        if(accessToken!==undefined){
            const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/logout`,{
                method:'POST',
                headers:AuthorizeHeader(accessToken),
                cache:'no-store'
            });

            console.log('response logout: '+JSON.stringify(response.status));
            console.log('response logout: '+JSON.stringify(response.statusText));

            if(response.status===200){
                cookies().delete('accessToken');
                cookies().delete('refreshToken');
                cookies().delete('email');
                cookies().delete('roles');
                cookies().delete('userId');
                cookies().delete('name');

                return {message:'SUCCESS'};
            }else if(response.status===401){
                //return {message:ERROR.INVALID_MEMBER};
                cookies().delete('accessToken');
                cookies().delete('refreshToken');
                cookies().delete('email');
                cookies().delete('roles');
                cookies().delete('userId');
                cookies().delete('name');

                return {message:'SUCCESS'};
            }else{
                return {message:ERROR.SERVER_ERROR};
            }
        }
        
    }catch(err){
        return {message:ERROR.SERVER_ERROR};
    }

}
export async function getAccessToken(token:string){
  
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/refresh`,{
            method:'POST',
            headers:AuthorizeHeader(token),
            cache:'no-store',
        });

        console.log('getAccessToken: '+response.status);
    
        if(response.status===200){
            const cookieAccessString = response.headers.getSetCookie()[0];
            console.log('getAccessToken: '+cookieAccessString);
    
            if(cookieAccessString!==undefined){
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
               
                } else {
                    console.log(ERROR.SERVER_ERROR);
                }  
            }
        }else{
            console.log('error: '+ERROR.SERVER_ERROR);
        }
      
    }catch(err){
        console.log('getAccessToken: '+err);
    }
   
}
export async function uploadFiles(prevState: UploadMessage, formData: FormData) {
    const file = formData.get('file') as File;
    console.log('rawFormData: ' + JSON.stringify(file));
    if (!file) {
        return { ...prevState, message: ERROR.INVALID_INPUT };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('buffer: ' + JSON.stringify(buffer));
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.USER}/modify`, {
            method: 'POST',
            body: JSON.stringify(buffer),
            headers: CommonHeader,
            cache: 'no-store',
        });
        const result: MessageData = await response.json();
        if (result.message === 'SUCCESS') {
            revalidatePath('/user-info');
            return { ...prevState, message: 'SUCCESS' };
        } else {
            return { ...prevState, message: ERROR.SERVER_ERROR };
        }
    } catch (err) {
        return { ...prevState, message: ERROR.SERVER_ERROR };
    }
}

export async function modifyUserInfo(prevState:UserInfoMessage,formData:FormData){
    const rawFormData={
        name:formData.get('name')?.toString(),
        phone:formData.get('phone')?.toString(),
    }

    if(rawFormData.name==='' || rawFormData.phone===''){
        if(rawFormData.name===''){
            return {...prevState,name_message:'필수 항목입니다.'}
        }
        if(rawFormData.phone===''){
            return {...prevState,phone_message:'필수 항목입니다.'}
        }
    }

    const response=await fetch(``,{
        method:'PUT',
        headers:CommonHeader,
        body:JSON.stringify(rawFormData),
        cache:'no-store'
    });

    const result:MessageData=await response.json();

    if(result.message==='SUCCESS'){
        revalidatePath(`${PG.USER_INFO}?modify=true`);
        return {...prevState,result_message:'SUCCESS'};
    }else{
        return {...prevState,result_message:ERROR.SERVER_ERROR};
    }

}

