'use server';
import { ERROR } from "@/constants/enums/ERROR";
import { extractCookie } from "@/service/utils/extract";
import { I_ApiUserLoginRequest } from "@/types/UserData";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  console.log(`3 - login POST 경로 : 진입 성공`);
  const body = (await request.json()) as I_ApiUserLoginRequest;
  //trim all values
  const data = Object.fromEntries(
    Object.entries(body).map(([key, value]) =>
      [key, value.trim()]
    )
  ) as I_ApiUserLoginRequest;
  if (!data.email || !data.password) {
    return NextResponse.json({ status: 400 });
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/local`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const cookieAccessString = response.headers.getSetCookie()[0];
      const cookieRefreshString = response.headers.getSetCookie()[1];
      const nextResponse = NextResponse.json({ success: true, message: "SUCCESS" }, { status: 200 });
      nextResponse.cookies.set({
        name: 'accessToken',
        value: extractCookie(cookieAccessString, 'accessToken'),
        path: '/',
        maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
        expires: new Date(extractCookie(cookieAccessString, 'Expires')),
        sameSite: 'none',
        httpOnly: false,
      });
      nextResponse.cookies.set({
        name: 'refreshToken',
        value: extractCookie(cookieRefreshString, 'refreshToken'),
        maxAge: Number(extractCookie(cookieRefreshString, 'Max-Age')),
        expires: new Date(extractCookie(cookieRefreshString, 'Expires')),
        path: '/',
        sameSite: 'none',
        httpOnly: false,
      });
      return nextResponse;
    }
  } catch (err) {
    return NextResponse.json({ success: false, error_message: ERROR.SERVER_ERROR });
  }
  // const calendarBody: IEvent = {
  //   title: '출석',
  //   startTime: new Date(),
  //   endTime: new Date(),
  //   allDay: true,
  //   id: new Date().getTime(),
  //   userId: 1
  // };
  // const calendarResponse = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.CALENDAR}/add`, {
  //   method: 'POST',
  //   headers: CommonHeader,
  //   body: JSON.stringify(calendarBody),
  //   cache: 'no-store'
  // });
  // const calendarResult = await calendarResponse.json();
  // if (calendarResult === 'SUCCESS') {
  //   console.log('출책 SUCCESS');
  // } else {
  //   console.log('출책 ERROR IN SERVER');
  // }
  // 쿠키 설정 (필요에 따라 수정)
  // nextResponse.cookies.set({
  //   name: 'UserData',
  //   value: JSON.stringify(res.data),
  //   path: '/',
  //   //expires: new Date(Date.now() + result.refreshTokenExpired)
  // });
  // nextResponse.cookies.set({
  //   name: 'accessToken',
  //   value: result.accessToken,
  //   path: '/',
  //   //expires: new Date(Date.now() + result.accessTokenExpired)
  // });
  // nextResponse.cookies.set({
  //   name: 'refreshToken',
  //   value: result.refreshToken,
  //   path: '/',
  //   //expires: new Date(Date.now() + result.refreshTokenExpired)
  // });
  // //store에 데이터 추가
  // // store.dispatch(setUserData({
  // //   id: 1,
  // //   name: "유리",
  // //   oauthId: 0,
  // //   role: "ROLE_USER",
  // //   calendarId: 0,
  // //   toeicLevel: 2,
  // //   isLogined: true
  // // }));
}