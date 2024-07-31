'use client';

import { logout } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { useRouter } from "next/navigation";


const LogoutBtn=()=>{
    const router=useRouter();
    
    const handleLogout=async()=>{
        const response=await logout();

        if(response?.message!==undefined){
            handleError(response.message);
        }else if(response?.message==='SUCCESS'){
            router.push('/');    
        }
    }

    return(<>
    <button 
    className="text-black navSidebar_p font-semibold"
    onClick={handleLogout}>로그아웃</button>
    </>);
}
export default LogoutBtn;