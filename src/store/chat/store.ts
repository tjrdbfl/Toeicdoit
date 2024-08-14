'use client';
import { create } from "zustand";

type ChatAlertStore = {
    message:string;
    fadeOut: boolean;
}
export const useChatAlertStore=create<ChatAlertStore>((set)=>({
    fadeOut:false,
    message:'',
}))
type ChatNewMessageStore = {
    message:string;
    fadeOut: boolean;
}
export const useChatNewMessageStore=create<ChatNewMessageStore>((set)=>({
    fadeOut:false,
    message:'',
}))