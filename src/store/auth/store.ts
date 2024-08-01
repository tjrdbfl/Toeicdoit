'use client';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserInfoStore={
    get:boolean;
    name:string;
    toeicLevel:number;
    profile:string;
}
export const useUserInfoStore = create<UserInfoStore>()(
    persist((set)=>({
        get:false,
        name:'',
        toeicLevel:0,
        profile:'',
        }),
    {
        name: 'UserInfoStore',
        storage: createJSONStorage(() => localStorage),
    }
));