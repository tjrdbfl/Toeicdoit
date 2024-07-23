import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const cookieStore=cookies();
  const accessToken=cookieStore.get('accessToken')?.value;
  // const userRole=cookieStore.get('userRole');
  const pathname=request.nextUrl.pathname;


  if(accessToken && (pathname ==='/login' || pathname==='/register')){
      return NextResponse.redirect(new URL('/',request.url));
  }

  if(accessToken===undefined 
      && (pathname.match(/^\/exam\/\d+/) 
      || pathname.match(/^\/level\/\d+/) 
      || pathname.match(/^\/part\/\d+/) 
      || pathname.startsWith('/level-test/test')
      || pathname.startsWith('/my-page'))
    ){
      return NextResponse.redirect(new URL('/login',request.url));
  }

  // if(pathname.startsWith('/admin') && userRole?.value!=='ROLE_ADMIN'){
  //     return NextResponse.redirect(new URL('/',request.url));
  // }

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
    '/my-page/:path*'  // my-page 하위 경로 모두
  ],
};