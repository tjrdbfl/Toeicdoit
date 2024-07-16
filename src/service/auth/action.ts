"use server";

import { I_ApiUserLoginRequest } from "@/app/api/login/route";
import { CommonHeader } from "@/config/headers";
import { ERROR } from "@/constants/enums/ERROR";
import { IUser } from "@/store/auth/user-model";
import { LoginMessageState } from "@/templates/auth/LoginForm";
import { MessageData } from "@/types/MessengerData";
import { LoginSchema } from "@/types/schemas";
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
