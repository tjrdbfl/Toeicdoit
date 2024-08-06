"use client";
import { useEffect } from "react";
import SettingScrollArea from "./SettingScrollArea";
import { getUserInfoInCookie } from "@/service/utils/token";
import { useUserInfoStore } from "@/store/auth/store";


export default function SettingChatContainer() {

    const {name,email}=useUserInfoStore();

    const handleUserInfo=async()=>{
 
        const response=await getUserInfoInCookie();
        if(response.email!==undefined){
            useUserInfoStore.setState({
                email:response.email
            })
        }
        if(response.name!==undefined){
            useUserInfoStore.setState({
                name:response.name
            })
        }
    }

    useEffect(()=>{
        handleUserInfo();
    },[]);

    return (<>
        <h2 className="form_label mb-2">계정 정보</h2>
        <div className="rounded-xl bg-blue-50 py-3 px-5 gap-y-5">
            <p className="text-slate-500 text-[14px]">아이디 : {email}</p>
            <p className="text-slate-500 text-[14px]">이름 : {name}</p>
        </div>
        <div className="mt-5" />
        <h2 className="form_label mb-2">채팅방 관리</h2>
        <SettingScrollArea/>

    </>);
} 