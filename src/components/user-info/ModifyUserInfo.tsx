import MyPageBtn from "@/components/button/MyPageBtn";
import { useApp } from "@/contexts/AppContext";

const ModifyUserInfo=()=>{
    const {userData}=useApp();
    return(<>
    <div className="flex flex-col">
        <p className="text-black text-3xl font-medium">{userData?.firstName}유리님 안녕하세요.</p>
        <div className="mt-[6%]"/>
        <p className="text-[#5AB2FF] font-medium text-xl">Lv . 1</p>
        <div className="mt-[7%]"/>
        <MyPageBtn label={'회원정보 수정'} style={"w-40"} />
    </div>
    </>);
}
export default ModifyUserInfo;