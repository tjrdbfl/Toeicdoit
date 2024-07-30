import { PayloadData } from "@/types/MessengerData";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { extractCookie } from "./extract";
import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER } from "@/constants/enums/API";
import { NextResponse } from "next/server";

export async function hashPassword(password:string):Promise<string>{
    const salt = CryptoJS.lib.WordArray.random(128 / 8); // 128비트 솔트 생성
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32, // 256비트 키 생성
        iterations: 10000 // 반복 횟수 (보안 강도 조절)
    });

    const hash = CryptoJS.SHA256(key).toString(); // SHA-256 해싱
    return hash + '.' + salt; // 해시 값과 솔트를 함께 저장
}

export async function verifyPassword(password:string, hashWithSalt:string): Promise<boolean>{
    const [hash,salt]=hashWithSalt.split('.');
    const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(salt), {
        keySize: 256 / 32,
        iterations: 10000
    });
    const newHash=CryptoJS.SHA256(key).toString();

    return hash===newHash;
}

export async function getAccessToken(token:string){
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.AUTH}/refresh`,{
            method:'POST',
            headers:AuthorizeHeader(token),
            cache:'no-store',
        });
        
        const result=await response.json();
        console.log('getAccessToken response: '+JSON.stringify(result));
       
        // const cookieAccessString = response.headers.getSetCookie()[0];
        // cookies().set({
        //     name: 'accessToken',
        //     value: extractCookie(cookieAccessString, 'accessToken'),
        //     path: '/',
        //     maxAge: Number(extractCookie(cookieAccessString, 'Max-Age')),
        //     expires: new Date(extractCookie(cookieAccessString, 'Expires')),
        //     sameSite: 'lax',
        //     httpOnly: true,
        // });
    }catch(err){
        console.log('getAccessToken: '+err);
       // return new NextResponse('Unauthorized', { status: 401 });
    }
   
}