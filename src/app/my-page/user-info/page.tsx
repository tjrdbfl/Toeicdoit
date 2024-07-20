'use server';
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";
import { UserDataPublic } from "@/types/UserData";

export default async function UserInfoPage(){

    let userInfo:UserDataPublic={
        id: 0,
        email: "",
        phone: "",
        profile: "",
        name: "",
        toeicLevel: 0
    };

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.USER}/detail?id=${1}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        })

        const result:UserDataPublic=await response.json();

        if(result){
            userInfo=result;
        }else{
            console.log(ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log(ERROR.SERVER_ERROR);
    }

    return(<>
    <div className="flex flex-col">
    <UserInfoContainer userInfo={userInfo}/>
    </div>
    </>);
}

