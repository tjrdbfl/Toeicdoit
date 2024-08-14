'use client';

import { logout } from "@/service/auth/actions";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logout();

        if(response?.message.length!==0){
            console.log('sssssss');
            router.push('/');
            router.refresh();
        }
      
    };


    return (<>
        <button
            className="text-black navSidebar_p font-semibold"
            onClick={handleLogout}>로그아웃</button>
    </>);
}
export default LogoutBtn;