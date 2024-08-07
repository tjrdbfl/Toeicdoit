'use client';
import { ERROR } from "@/constants/enums/ERROR";
import { getUserInfoInCookie, setCookie } from "@/service/utils/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {

    const router=useRouter();

    const handleCookie=async()=>{
        const response=await setCookie();

        if(response.status===200){
            const response=await getUserInfoInCookie();

            console.log(JSON.stringify(response));
            router.push('/');   
        }else{
            alert(ERROR.SERVER_ERROR);
            router.push('/login');
        }
    }

    useEffect(()=>{
        handleCookie();
    },[]);

    return (<>

    </>);
}