'use client';

import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { findUserInfoById, login, modifyByPassword } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { useUserInfoStore } from "@/store/auth/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export interface ModifyPasswordMessageState {
    message: {
        email?: string[] | undefined;
        password?: string[] | undefined;
        newPassword?: string[] | undefined;
    };
    result_message: string; 
}

const initialState: ModifyPasswordMessageState = {
    message: {
        email: undefined,
        password: undefined,
        newPassword: undefined,
    },
    result_message: "",
};

const PasswordModifyForm = () => {

    const { pending } = useFormStatus();
    const [state,formAction]=useFormState(modifyByPassword,initialState);
    const [message,setMessage]=useState<ModifyPasswordMessageState>(initialState);
    
    const [confirm,setConfirm]=useState<boolean>(false);

     //Refs
     const emailRef = useRef<HTMLInputElement>(null);
     const passwordRef = useRef<HTMLInputElement>(null); 
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    
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

    const handleNewPasswordChange=(event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.length<1){
            setMessage((prevState)=>({
                ...prevState,
                message:{
                    ...prevState.message,
                    newPassword:['필수 항목입니다.']
                }
            }))
        }else{
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    newPassword: [""]
                },
            }));
        }
    }; 

    const handleSubmit = async (formData: FormData) => {
        const result: ModifyPasswordMessageState  = await modifyByPassword(initialState,formData);

        if (result.message) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    email: result.message.email || [],
                    password: result.message.password || [],
                    newPassword:result.message.newPassword || [],
                },
                result_message: result.result_message,
            }));
        }
        
        if(result.result_message==='SUCCESS'){ 
            alert('비밀번호 변경을 성공하셨습니다.')  
            router.push(`${PG.LOGIN}`);
            router.refresh();
        }else{
            handleError(result.result_message);
        }

    };


    return (<>
        <form
            action={handleSubmit}
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
            <p className="form_label">기존 비밀번호</p>
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
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if (passwordRef.current) {
                            passwordRef.current.focus();
                        }
                    }
                }}
            />
            {message.message.password && <p aria-live="polite"  className="form_error_msg">{message.message.password}</p>}
            
            <div className="mt-[5%]" />
            <div className="mt-[5%]" />
            <p className="form_label">새 비밀번호</p>
            <div className="mt-3"/>
            <input
                id="newPassword"
                name='newPassword'
                type="password"
                className="form_input"
                placeholder="비밀번호를 입력해주세요."
                required
                disabled={pending}
                onChange={handleNewPasswordChange}
                ref={passwordRef}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if (passwordRef.current) {
                            passwordRef.current.focus();
                        }
                    }
                }}
            />
            {message.message.newPassword && <p aria-live="polite"  className="form_error_msg">{message.message.newPassword}</p>}
            
            <div className="mt-[5%]" />
            <p className="form_label">새 비밀번호 확인</p>
            <div className="mt-3"/>
            
            <input
                type='password'
                name='confirmPassword'
                className="form_input"
                placeholder="비밀번호를 다시 입력해주세요."
                ref={passwordConfirmRef}
                required
                onChange={() => {
                    if (passwordConfirmRef.current?.value !== passwordRef.current?.value) {
                        setError('비밀번호가 일치하지 않습니다.');
                        setConfirm(false);
                    } else {
                        setError('');
                        setConfirm(true);
                    }
                }}
                disabled={pending}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.currentTarget.focus();
                    }
                }}
            />
            {error && <p className="form_error_msg">{error}</p>}

            <div className="mt-10" />
            <SubmitButton label={"변경하기"} 
            //click={click} 
            disabled={!confirm}
            //setClick={setClick}
             />
        </form>

    </>);
}
export default PasswordModifyForm;