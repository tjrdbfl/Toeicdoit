'use client';

import { ERROR } from "@/constants/enums/ERROR";

export function handleError(message:string){
    if(message===ERROR.INVALID_INPUT){
        alert(ERROR.INVALID_INPUT);    
    }else if(message===ERROR.INVALID_MEMBER){
        alert(ERROR.INVALID_MEMBER);
    }else if(message===ERROR.NETWORK_ERROR){
        alert(ERROR.NETWORK_ERROR);
    }else if(message===ERROR.SERVER_ERROR){
        alert(ERROR.SERVER_ERROR);
    }
}