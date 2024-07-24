'use server';
import { register } from "@/service/auth/action";
import RegisterForm, { RegisterMessageState } from "@/templates/auth/RegisterForm";

export default async function RegisterPage() {
    
    return (<>
        <div className="form w-[500px] p-10">
            <p className="form_title">회원가입</p>
            <RegisterForm register={register} />
        </div>
    </>);
}
