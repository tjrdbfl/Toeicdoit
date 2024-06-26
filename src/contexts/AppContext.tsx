'use client';
import { getUserData } from "@/lib/client/auth";
import { UserDataPublic } from "@/types/UserData";
import { usePathname } from "next/navigation";
import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface AppContextProps{
    isLoading:boolean;
    setIsLoading:Dispatch<SetStateAction<boolean>>;
    userData:UserDataPublic | null;
    setUserData:Dispatch<SetStateAction<UserDataPublic|null>>;
}

const AppContext=createContext<AppContextProps|undefined>(undefined);

interface AppProviderProps{
    children:ReactNode;
}

export const AppProvider:FunctionComponent<AppProviderProps>=({children})=>{
    const pathname=usePathname();

    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [userData,setUserData]=useState<UserDataPublic|null>(null);

    //get user data on each route change
    useEffect(()=>{
        const userData=getUserData();
        setUserData(userData);
    },[pathname]);

    return(<>
    <AppContext.Provider
    value={{isLoading,setIsLoading,userData,setUserData}}
    >{children}</AppContext.Provider>
    </>);

}

export const useApp=():AppContextProps=>{
    const context=useContext(AppContext);
    if(!context){
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}