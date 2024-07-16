'use server';
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { store } from "@/redux";
import { setUserData } from "@/store/auth/user-slice";
import { MessageData } from "@/types/MessengerData";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export interface I_ApiUserLoginRequest {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    console.log(`3 - login POST 경로 : 진입 성공`);
    const body=(await request.json()) as I_ApiUserLoginRequest;
    
    //trim all values
    const data=Object.fromEntries(
      Object.entries(body).map(([key,value])=>
        [key,value.trim()]
      )
    ) as I_ApiUserLoginRequest;

    if(!data.email || !data.password){
      return NextResponse.json({status:400});
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.AUTH}/local/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'no-store'
      });
  
      const result: MessageData = await response.json();
  
      if (result.message === 'SUCCESS') {
        const nextResponse = NextResponse.json({ success: true, message: "SUCCESS" }, { status: 200 });
        
        // 쿠키 설정 (필요에 따라 수정)
        nextResponse.cookies.set({
          name: 'UserData',
          value: JSON.stringify(result.data),
          path: '/',
            expires:new Date(Date.now()+result.refreshTokenExpired)
        });
        nextResponse.cookies.set({
          name: 'accessToken',
          value: result.accessToken,
          path: '/',
            expires:new Date(Date.now()+result.accessTokenExpired)
        });
        nextResponse.cookies.set({
          name: 'refreshToken',
          value: result.refreshToken,
          path: '/',
            expires:new Date(Date.now()+result.refreshTokenExpired)
        });
        
       //store에 데이터 추가
       store.dispatch(setUserData({
         id: 1,
         name: "유리",
         oauthId: 0,
         role: "ROLE_USER",
         calendarId: 0,
         toeicLevel: 2,
         isLogined: true
       }));
        
       
        return nextResponse;
      } else {
        return NextResponse.json({ success: false, error_message: result.message }, { status: 401 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ success: false, error_message: ERROR.SERVER_ERROR }, { status: 500 }); // 서버 오류 상태 코드 500
    }
}