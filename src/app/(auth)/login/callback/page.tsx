'use client';
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { getUserInfoInCookie, setCookie } from "@/service/utils/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function CallbackPage() {

    const router=useRouter();

    const handleCookie=async()=>{
        const response=await setCookie();
       
        console.log('setCookie: '+response.status);
        
        if(response.status===200){
            const response=await getUserInfoInCookie();

            console.log(JSON.stringify(response));
            router.push('/');   
        }else{
            alert(ERROR.SERVER_ERROR);
            router.push(`${PG.LOGIN}`);
        }
    }

    useEffect(()=>{
        handleCookie();
    },[]);

    return (<>

    </>);
}