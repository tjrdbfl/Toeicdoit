"use client";
import { ScrollArea } from "@/components/utils/ScrollArea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import SettingScrollArea from "./SettingScrollArea";


export default function SettingChatContainer() {


    return (<>
        <h2 className="form_label mb-2">계정 정보</h2>
        <div className="rounded-xl bg-blue-50 py-3 px-5 gap-y-5">
            <p className="text-slate-500 text-[14px]">아이디 : { }</p>
            <p className="text-slate-500 text-[14px]">이름 : { }</p>
        </div>
        <div className="mt-5" />
        <h2 className="form_label mb-2">채팅방 관리</h2>
        <SettingScrollArea/>

    </>);
} 