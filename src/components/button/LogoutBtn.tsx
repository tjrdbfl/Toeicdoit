'use client';

import { logout } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { useUserInfoStore } from "@/store/auth/store";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";


const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logout();

        const result = await response?.message;

        if (result === 'SUCCESS') {
            router.push('/');
           
        } else if (result !== undefined) {
            handleError(result);
            
            router.push('/');     
        }  
       
    };


    return (<>
        <button
            className="text-black navSidebar_p font-semibold"
            onClick={handleLogout}>로그아웃</button>
    </>);
}
export default LogoutBtn;