'use server';
import { register } from "@/service/auth/action";
import RegisterForm, { RegisterMessageState } from "@/templates/auth/RegisterForm";

export default async function RegisterPage() {
    
    return (<>
        <div className="form w-[550px] p-10">
            <p className="form_title">Sign-Up</p>
            <RegisterForm register={register} />
        </div>
    </>);
}
