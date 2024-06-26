'use client';
import ModifyProfileBtn from "@/components/user-info/ModifyProfileBtn";
import ModifyUserInfo from "@/components/user-info/ModifyUserInfo";

const UserInfoContainer = () => {

    return (<>
        <div className="container_color w-auto p-7 flex flex-row gap-x-10">
            <ModifyProfileBtn/>
            <div className='flex flex-row gap-x-10 p-5 container_color'>
            <ModifyUserInfo/>
            <div className="bg-black w-1 h-full"/>
            </div>
        </div>

    </>);
}
export default UserInfoContainer;