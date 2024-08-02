import RegisterBtn from "@/components/auth/RegisterBtn";
import GoogleAuthBtn from "@/components/button/GoogleAuthBtn";
import { PG } from "@/constants/enums/PG";
import LoginForm from "@/templates/auth/LoginForm";
import PasswordModifyForm from "@/templates/auth/PasswordModifyForm";
import Link from "next/link";

export default function PasswordModifyPage() {
  return (
    <>
      <div className="form w-[500px] p-10">
        <p className="form_title">비밀번호 찾기</p>
        <PasswordModifyForm />
        <div className="mt-5" />
        <Link
            href={`${PG.LOGIN}`}
            className="w-full h-auto py-[2.5%] mt-[3%] flex items-center justify-center p-[1%] rounded-lg common_btn text-white font-medium">
            로그인으로 돌아가기
            </Link>
      </div>
    </>
  );
}
