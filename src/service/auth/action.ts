"use server";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { IUser } from "@/store/auth/user-model";
import { LoginMessageState } from "@/templates/auth/LoginForm";
import { UploadMessage } from "@/templates/auth/ProfileForm";
import { RegisterMessageState } from "@/templates/auth/RegisterForm";
//import { UserInfoMessageState } from "@/templates/auth/UserInfoForm";
import { MessageData } from "@/types/MessengerData";
import { LoginSchema, RegisterSchema } from "@/types/schemas";
import { I_ApiUserLoginRequest, I_ApiUserRegisterRequest } from "@/types/UserData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function login(prevState: LoginMessageState, formData: FormData) {
    const cookieStore=cookies();
    let UserData:IUser={
        id: 0,
        name: "",
        oauthId: 0,
        role: "",
        calendarId: 0,
        toeicLevel: 0,
        isLogined: false
    };

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
    console.log('Received form data: ', data);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/login`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(data),
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
        phone:validatedFields.data.phone,
        name:validatedFields.data.name
    }
    console.log('Received form data: ', data);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.AUTH}/join`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(data),
            cache:'no-store'
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

export async function uploadFiles(prevState:UploadMessage,formData:FormData){
    const file=formData.get('file') as File;
    console.log('rawFormData: '+JSON.stringify(file));

    if(!file){
        return{...prevState,message:ERROR.INVALID_INPUT};
    }

    const buffer=Buffer.from(await file.arrayBuffer());
    console.log('buffer: '+JSON.stringify(buffer));

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.USER}/modify`,{
            method:'POST',
            body:JSON.stringify(buffer),
            headers:CommonHeader,
            cache:'no-store',
        });

        const result:MessageData=await response.json();

        if(result.message==='SUCCESS'){
            revalidatePath('/user-info');
            return {...prevState,message:'SUCCESS'};
        }else{
            return {...prevState,message:ERROR.SERVER_ERROR};
        }
    }catch(err){
        return {...prevState,message:ERROR.SERVER_ERROR};
    }

}
// export async function modifyUserInfo(prevState:UserInfoMessageState,formData:FormData){
//     const rawFormData={
//         name:formData.get('name')?.toString(),
//         phone:formData.get('phone')?.toString(),
//     }

//     if(rawFormData.name==='' || rawFormData.phone===''){
//         if(rawFormData.name===''){
//             return {...prevState,name_message:'필수 항목입니다.'}
//         }
//         if(rawFormData.phone===''){
//             return {...prevState,phone_message:'필수 항목입니다.'}
//         }
//     }

// }