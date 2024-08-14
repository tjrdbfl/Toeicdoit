import MyPageBtn from "@/components/button/MyPageBtn";
import UserInfoForm from "@/templates/auth/UserInfoForm";
import { UserDataPublic } from "@/types/UserData";
import { useSearchParams } from "next/navigation";


const ModifyUserInfo=({email,name,phone,toeicLevel}:{
    email:string|undefined;
    name:string|undefined;
    phone:string|undefined;
    toeicLevel:number|undefined;

})=>{
    
    const modify=useSearchParams().get('modify');

    return(<>
    <div className="flex flex-col">
        <p className="text-black text-lg font-medium">{name}님 안녕하세요.</p>
        <div className="mt-3"/>
        <p className="text-[var(--blue2)] font-medium text-[14px]">Lv . {toeicLevel===undefined || toeicLevel===null ? 0: toeicLevel}</p>
        <div className="mt-5"/>
        <MyPageBtn label={'회원정보 수정'} />
    </div>
    {modify==='true' && <UserInfoForm 
    email={email} 
    name={name}
    phone={phone}/>}
    </>);
}
export default ModifyUserInfo;