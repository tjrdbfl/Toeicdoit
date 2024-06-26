'use client';

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from "@/app/api/login/route";
import AuthInput from "@/components/auth/AuthInput";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import PhoneNumberSelect from "@/components/auth/PhoneNumberSelect";
import RegCheckBox from "@/components/auth/RegCheckBox";
import { useApp } from "@/contexts/AppContext";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const RegisterForm = () => {

    const { userData, setUserData } = useApp();

    //Utils
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    //Refs
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    //State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [registerIsComplete, setregisterIsComplete] = useState<boolean>(false);

    const [phone, setPhone] = useState('');
    const tel1Ref = useRef<HTMLInputElement>(null);
    const tel2Ref = useRef<HTMLInputElement>(null);

    const handleChange = (event: { target: { value: string } }) => {
        setPhone(event.target.value);
    };
    //Handlers
    const handleRegister = async () => {
        window.location.replace('/register/complete');
    };

    return (<>
        {registerIsComplete ? (<div>
            loading
        </div>) : (<>
            <div className="">
                <AuthInput ref={nameRef} placeholder={"이름을 입력해주세요."} label={"이름"} handle={handleRegister} />

                {error && <p className="form_error_msg">{error}</p>}

                <div className="mt-[5%]" />
                <AuthInput ref={emailRef} placeholder={"이메일을 입력해주세요."} label={"이메일"} handle={handleRegister} />
                {error && <p className="form_error_msg">{error}</p>}

                <div className="mt-[5%]" />
                <AuthInput ref={passwordRef} placeholder={"비밀번호를 입력해주세요."} handle={handleRegister} label={"비밀번호"} />
                {error && <p className="form_error_msg">{error}</p>}

                <div className="mt-[5%]" />
                <p className="form_label">비밀번호 확인</p>

                <input className="form_input"
                    placeholder="비밀번호를 다시 입력해주세요."
                    ref={passwordRef}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleRegister();
                        }
                    }}
                />
                {error && <p className="form_error_msg">{error}</p>}

                <div className="mt-[5%]" />
                <p className="form_label">전화번호</p>
                <div className="flex flex-row justify-between">
                    <PhoneNumberSelect phone={phone} handleChange={handleChange} />
                    <div className="text-slate-500 text-center font-bold text-xl mt-[10px]">ㅡ</div>
                    <PhoneNumberInput ref={tel1Ref} handle={handleRegister} style={"tel_form_input1"} />
                    <div className="text-slate-500 text-center font-bold text-xl mt-[10px]">ㅡ</div>
                    <PhoneNumberInput ref={tel2Ref} handle={handleRegister} style={"tel_form_input2"} />
                </div>
                {error && <p className="form_error_msg">{error}</p>}
                
                <RegCheckBox/>

                <div className="mt-[7%]" />
                <button
                    className="form_submit_btn"
                    onClick={handleRegister}>회원가입</button>
            </div>
        </>)}

    </>);
}
export default RegisterForm;