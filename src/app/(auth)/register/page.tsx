'use server';
import { register } from "@/service/auth/action";
import RegisterForm, { RegisterMessageState } from "@/templates/auth/RegisterForm";

export default async function RegisterPage() {
    
    return (<>
        <div className="form lg:w-[34%] md:w-[60%] sm:w-[90%] lg:p-[2%] p-[3%] mt-[2%]">
            <p className="form_title">Sign-Up</p>
            <RegisterForm register={register} />
        </div>
    </>);
}
