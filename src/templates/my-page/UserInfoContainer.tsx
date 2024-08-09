'use client';
import ModifyProfileBtn from "@/components/user-info/ModifyProfileBtn";
import ModifyUserInfo from "@/components/user-info/ModifyUserInfo";
import { ERROR } from "@/constants/enums/ERROR";
import { UserDataPublic } from "@/types/UserData";

const UserInfoContainer = ({userInfo,userInfoSuccess}:{
    userInfo:UserDataPublic|undefined;
    userInfoSuccess:boolean;
}) => {

    return (<>
        <div className="container_color w-full px-4 flex flex-row gap-x-10">
            <ModifyProfileBtn profile={userInfo?.profile}/>
            <div className='flex flex-row gap-x-10 p-4'>
            <ModifyUserInfo 
                    email={userInfo?.email}
                    toeicLevel={userInfo?.toeicLevel}
                    name={userInfo?.name} 
                    phone={userInfo?.phone}            />
            <div className="bg-slate-200 w-1 h-full"/>
            </div>

        </div>

    </>);
}
export default UserInfoContainer;