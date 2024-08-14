import GoogleAuthBtn from "@/components/button/GoogleAuthBtn";
import RegisterBtn from "@/components/auth/RegisterBtn";
import LoginForm from "@/templates/auth/LoginForm";
import Link from "next/link";
import { PG } from "@/constants/enums/PG";


export default function LoginPage() {

    return (<>
        <div className="form w-[500px] p-10">
            <p className="form_title">로그인</p>
            <LoginForm/>
            <GoogleAuthBtn />
            <Link
            href={`${PG.LOGIN}/modify`}
            className="text-zinc-700 underline"
            >비밀번호 변경</Link>
            <div className="mt-5"/>
            <p className="text-black">아직 계정이 없으신가요?</p>
            <RegisterBtn />
        </div>
    </>);
}
