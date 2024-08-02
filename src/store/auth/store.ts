'use client';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserInfoStore={
    get:boolean;
    name:string;
    toeicLevel:number;
    profile:string;
    email:string;
    reset:()=>void;
}
export const useUserInfoStore = create<UserInfoStore>()(
    persist((set)=>({
        get:false,
        name:'',
        toeicLevel:0,
        profile:'',
        email:'',
        reset:()=>set({
            get:false,
            name:'',
            toeicLevel:0,
            profile:'',
            email:'',
        })
        }),
    {
        name: 'UserInfoStore',
        storage: createJSONStorage(() => localStorage),
    }
));