'use client';
import GoogleAuthBtn from "@/components/auth/GoogleAuthBtn";
import RegisterBtn from "@/components/auth/RegisterBtn";
import LoginForm from "@/templates/auth/LoginForm";


export default function LoginPage() {

    return (<>
            <div className="form xl:w-[40%] lg:w-[400px] md:w-[60%] sm:w-[90%] lg:p-[2%] p-[3%] mt-[2%]">
                <p className="form_title">Login</p>
                <LoginForm />
                <GoogleAuthBtn />
                <p className="text-black text-lg">아직 계정이 없으신가요?</p>
                <RegisterBtn />
            </div>
    </>);
}
