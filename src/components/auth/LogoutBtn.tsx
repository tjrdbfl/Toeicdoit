'use client';

import { logout } from "@/service/auth/actions";


const LogoutBtn=()=>{
    
    const handleLogout=async()=>{
        const response=await logout();
        
    }
    return(<>
    <button 
    className="text-black navSidebar_p font-semibold"
    onClick={handleLogout}>로그아웃</button>
    </>);
}
export default LogoutBtn;