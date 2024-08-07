'use client';

import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { findUserInfoById, login } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { UserInfoStore, useUserInfoStore } from "@/store/auth/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export interface LoginMessageState {
    message: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    };
    result_message: string;
}  
const initialState: LoginMessageState = {
    message: {
        email: "" || undefined,
        password: "" || undefined,
    },
    result_message: "",
}

const LoginForm = () => {

    const { pending } = useFormStatus();
    const [state,formAction]=useFormState(login,initialState);
    const [message,setMessage]=useState<LoginMessageState>(initialState);
    const [click,setClick]=useState<boolean>(false);

    const {get,name,profile,toeicLevel}=useUserInfoStore();

    const router=useRouter();
    const handleEmailChange=(event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.length<1){
            setMessage((prevState)=>({
                ...prevState,
                message:{
                    ...prevState.message,
                    email:['필수 항목입니다.']
                }
            }))
        }else{
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    email: [""]
                },
            }));
        }
    };

    const handlePasswordChange=(event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.length<1){
            setMessage((prevState)=>({
                ...prevState,
                message:{
                    ...prevState.message,
                    password:['필수 항목입니다.']
                }
            }))
        }else{
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    password: [""]
                },
            }));
        }
    };

    const getUserInfo=async()=>{
        console.log('getUserInfo');
        
        const response = await findUserInfoById();

        console.log('getUserInfo: '+JSON.stringify(response));

        if (response?.status === 200) {
            console.log('response status: '+response.status);
            router.push('/');
           
        }else if(response?.status===400){
            alert(ERROR.INVALID_MEMBER);
            router.push(`${PG.LOGIN}`);
        }else{
            alert(response?.message);
        }

    }
    //Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
       
        if(state.result_message==='SUCCESS'){   
            getUserInfo();
        }else{
            handleError(state.result_message);
        }
     
    }, [state.result_message]);

    return (<>
        <form
            action={async (formData) => {
                await formAction(formData); 
            }}
        >
            <p className="form_label">이메일</p>
            <div className="mt-3"/>
            <input
                id='email'
                name='email'
                className="form_input"
                placeholder="이메일을 입력해주세요."
                type="email"
                required
                ref={emailRef}
                disabled={pending}
                onChange={handleEmailChange}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if (emailRef.current) {
                            emailRef.current.focus();
                        }
                    }
                }}
            />
            {state.message.email && <p aria-live="polite"  className="form_error_msg">{state.message.email}</p>}

            <div className="mt-[5%]" />
            <p className="form_label">비밀번호</p>
            <div className="mt-3"/>
            <input
                id="password"
                name='password'
                type="password"
                className="form_input"
                placeholder="비밀번호를 입력해주세요."
                required
                disabled={pending}
                onChange={handlePasswordChange}
                ref={passwordRef}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if (passwordRef.current) {
                            passwordRef.current.focus();
                        }
                    }
                }}
            />
            {state.message.password && <p aria-live="polite"  className="form_error_msg">{state.message.password}</p>}
            <div className="mt-[7%]" />
            <SubmitButton label={"로그인"} 
            click={click} 
            setClick={setClick} 
            />
           
        </form>

    </>);
}
export default LoginForm;