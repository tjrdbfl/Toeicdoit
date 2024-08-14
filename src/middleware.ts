import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PG } from "./constants/enums/PG";

export function middleware(request: NextRequest) {

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const userRole = cookieStore.get('roles')?.value;
  const payment = cookieStore.get('payment')?.value;
  const pathname = request.nextUrl.pathname;

  // //1. 로그인된 사용자에 대한 redirection
  // if (accessToken && (pathname === '/login' || pathname === '/register')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
  
  // //2. 접근 권한이 없는 사용자에 대한 redirection
  // if ((accessToken === undefined && refreshToken===undefined)
  //   && (pathname.match(/^\/exam\/\d+/)
  //     || pathname.match(/^\/level\/\d+/)
  //     || pathname.match(/^\/part\/\d+/)
  //     || pathname.startsWith('/level-test/test')
  //     || pathname.startsWith('/my-page'))
  // ) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // //3. 역할에 따른 권한 부여
  // if (pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // //4. 사용자에게 보여주지 않을 페이지 redirection
  // if(pathname==='/login/callback'){
  //   return NextResponse.redirect(new URL('/login',request.url));
  // }

  // //5. 사용자 결제 여부에 따른 유료 상품 접근 권한 제어
  // // if(payment==='false'
  // //   && (pathname.match(/^\/exam\/\d+/)
  // //   || pathname.match(/^\/level\/\d+/)
  // //   || pathname.match(/^\/part\/\d+/))){
  // //     return NextResponse.redirect(new URL(`${PG.PAYMENT}`, request.url));
  // // }

  return NextResponse.next();
}


// Middleware Config 추가
export const config = {
  matcher: [
    '/login',
    '/register',
    '/exam/:path*', // /exam/ 하위 경로 모두
    '/level/:path*', // /level/ 하위 경로 모두
    '/part/:path*', // /part/ 하위 경로 모두
    '/level-test/test',
    '/my-page/:path*',  // my-page 하위 경로 모두
  ],
};