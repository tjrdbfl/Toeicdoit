import MyPageBtn from "@/components/button/MyPageBtn";
import UserInfoForm from "@/templates/auth/UserInfoForm";
import { UserDataPublic } from "@/types/UserData";
import { useSearchParams } from "next/navigation";


const ModifyUserInfo=({userInfo}:{
    userInfo:UserDataPublic
})=>{
    
    const modify=useSearchParams().get('modify');

    return(<>
    <div className="flex flex-col">
        <p className="text-black text-lg font-medium">유리님 안녕하세요.</p>
        <div className="mt-3"/>
        <p className="text-[var(--blue2)] font-medium text-[14px]">Lv . {userInfo.toeicLevel}</p>
        <div className="mt-5"/>
        <MyPageBtn label={'회원정보 수정'} />
    </div>
    {modify==='true' && <UserInfoForm userInfo={userInfo}/>}
    </>);
}
export default ModifyUserInfo;