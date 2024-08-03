import { PayloadData } from "@/types/MessengerData";
import { jwtDecode } from "jwt-decode";

export function extractCookie(input: string, key: string): string {
    const pairs = input.split(';').map(pair => pair.trim().split('='));
    const obj = Object.fromEntries(pairs);
    return obj[key] || '';
}
export function getTokenExpired(token: string): Date | null {

    const payload: PayloadData = jwtDecode(token);

    if (payload !== undefined) {
        return new Date(payload.exp);
    } else {
        return null;
    }
}
export function isTokenExpired(token: string): boolean{
    const tokenExpired=getTokenExpired(token);
    
    if(tokenExpired===null){
        return false;
    }else{
        return tokenExpired < new Date();
    }
}