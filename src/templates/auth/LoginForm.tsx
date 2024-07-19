'use client';

import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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

const LoginForm = ({ login }: {
    login: (prevState: LoginMessageState, formData: FormData)
        => Promise<{ message: { email?: string[] | undefined; password?: string[] | undefined; }; result_message: string; }>
}) => {

    const { pending } = useFormStatus();
    const [state,formAction]=useFormState(login,initialState);
    const [message,setMessage]=useState<LoginMessageState>(initialState);

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
    
    //Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        console.log('state'+JSON.stringify(state));
        setMessage(state);

        if(state.result_message==='SUCCESS'){
            router.push('/');
            router.refresh();
        }else if(state.result_message===`${ERROR.SERVER_ERROR}`){
            alert(state.result_message);
        }
    }, [state.result_message, state.message.email, state.message.password]);

    return (<>
        <form
            action={formAction}
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
            {message.message.email && <p aria-live="polite"  className="form_error_msg">{message.message.email}</p>}

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
            {message.message.password && <p aria-live="polite"  className="form_error_msg">{message.message.password}</p>}
            <div className="mt-[7%]" />
            <SubmitButton label={"로그인"} />
        </form>

    </>);
}
export default LoginForm;