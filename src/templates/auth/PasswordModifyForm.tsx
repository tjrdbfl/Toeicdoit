'use client';

import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { findUserInfoById, login } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { UserInfoStore, useUserInfoStore } from "@/store/auth/store";
import { get } from "lodash";
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

const PasswordModifyForm = () => {

    const { pending } = useFormStatus();
    const [state,formAction]=useFormState(login,initialState);
    const [message,setMessage]=useState<LoginMessageState>(initialState);
    const [click,setClick]=useState<boolean>(false);
   
     //Refs
     const emailRef = useRef<HTMLInputElement>(null);
     const passwordRef = useRef<HTMLInputElement>(null); 
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    
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
        const response = await findUserInfoById();
        if (response?.status === 200) {
            useUserInfoStore.setState({
                get:true,
                name:response.data?.name,
                profile:response.data?.profile,
                toeicLevel:response.data?.toeicLevel,
                email:response.data?.email,
            });

            if(get){
                if(name===null){
                    router.push(`${PG.USER_INFO}`);
                }else if(toeicLevel===null){
                    router.push('/score');
                }else{
                    router.push('/');
                }
            }
           
        }else if(response?.status===400){
            alert(ERROR.INVALID_MEMBER);
            router.push(`${PG.LOGIN}`);
        }

    }
    
    useEffect(() => {
        console.log(state.result_message);
        router.refresh();
    
        if(state.result_message==='SUCCESS'){   
            getUserInfo();
        }else{
            handleError(state.result_message);
        }

    }, [state.result_message,click]);

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
            
            <div className="mt-[5%]" />
            <p className="form_label">비밀번호 확인</p>
            <div className="mt-3"/>
            
            <input
                type='password'
                className="form_input"
                placeholder="비밀번호를 다시 입력해주세요."
                ref={passwordConfirmRef}
                onChange={() => {
                    if (passwordConfirmRef.current?.value !== passwordRef.current?.value) {
                        setError('비밀번호가 일치하지 않습니다.');
                    } else {
                        setError('');
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
            click={click} 
            setClick={setClick} />
        </form>

    </>);
}
export default PasswordModifyForm;