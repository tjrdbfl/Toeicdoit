import { create } from "zustand";

type ChatBlockStore = {
    username: string;
    fadeOut: boolean;
}
export const useChatBlockStore=create<ChatBlockStore>((set)=>({
    username:'',
    fadeOut:false,
}))