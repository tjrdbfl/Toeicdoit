'use server';
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";

export default async function UserInfoPage(){
    return(<>
    <div className="flex flex-col">
    <UserInfoContainer/>
    </div>
    </>);
}

