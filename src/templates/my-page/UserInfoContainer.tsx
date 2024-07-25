'use client';
import ModifyProfileBtn from "@/components/user-info/ModifyProfileBtn";
import ModifyUserInfo from "@/components/user-info/ModifyUserInfo";
import { UserDataPublic } from "@/types/UserData";

const UserInfoContainer = ({userInfo}:{
    userInfo:UserDataPublic
}) => {

    return (<>
        <div className="container_color w-[600px] px-4 flex flex-row gap-x-10">
            <ModifyProfileBtn profile={userInfo.profile}/>
            <div className='flex flex-row gap-x-10 p-4'>
            <ModifyUserInfo userInfo={userInfo}/>
            <div className="bg-slate-200 w-1 h-full"/>
            </div>

        </div>

    </>);
}
export default UserInfoContainer;