'use client';
import { useApp } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

const LogoutBtn=()=>{
    const [isLoading, setIsLoading] = useState(true);
	const [isLoggedOut, setIsLoggedOut] = useState(false);
    const {setUserData}=useApp();

    const onClick=()=>{
        // fetch('/api/logout',{
        //     method:'GET',
        // }).then(res=>{
        //     if(res.ok){
        //         setIsLoggedOut(true);
        //         setUserData(null);
        //         window.location.replace('/');
        //     }
        // }).catch(()=>{
        //     console.error('Something went wrong!');
        // }).finally(()=>{
        //     setIsLoading(false);
        // })
    };

    return(<>
    <button className="text-black text-[18px] font-semibold"
    onClick={onClick}>로그아웃</button>
    </>);
}
export default LogoutBtn;