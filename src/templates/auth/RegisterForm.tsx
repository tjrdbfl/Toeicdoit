'use client';
import RegCheckBox from "@/components/auth/RegCheckBox";
import SubmitButton from "@/components/button/SubmitBtn";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { MessageData } from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export interface RegisterMessageState {
    message: {
        email?: string[] | undefined;
        password?: string[] | undefined;
        name?: string[] | undefined;
        phone?: string[] | undefined;
    };
    result_message: string;
}
const initialState: RegisterMessageState = {
    message: {
        email: "" || undefined,
        password: "" || undefined,
        name: "" || undefined,
        phone: "" || undefined,
    },
    result_message: "",
}

const RegisterForm = ({ register }: {
    register: (prevState: RegisterMessageState, formData: FormData)
        => Promise<{ message: { email?: string[] | undefined; password?: string[] | undefined; name?: string[] | undefined; phone?: string[] | undefined; }; result_message: string; }>

}) => {

    const { pending } = useFormStatus();
    const [message, setMessage] = useState<RegisterMessageState>(initialState);
    const [error, setError] = useState<string>('');
    const [confirm, setConfirm] = useState<boolean>(false);
    const [confirmMsg, setConfirmMsg] = useState<string>('');
    const router = useRouter();
    const [state, formAction] = useFormState(register, initialState);
    
    //Refs
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const phoneRef = useRef<HTMLInputElement>(null);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    email: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    email: [""]
                },
            }));
        }
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    password: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    password: [""]
                },
            }));
        }
    };
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    name: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    name: [""]
                },
            }));
        }
    };
    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    phone: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    phone: [""]
                },
            }));
        }
    };

    useEffect(() => {
        setConfirm(false);
        setConfirmMsg('');
        console.log('state' + JSON.stringify(state));
        setMessage(state);

        if (state.result_message === 'SUCCESS') {
            router.push(`${PG.LOGIN}`);
        } else if (state.result_message === `${ERROR.SERVER_ERROR}`) {
            alert(state.result_message);
        }
    }, [state.result_message, state.message.email, state.message.password, state.message.name, state.message.phone]);

    const existsEmail = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('emailRef.current?.value: ' + emailRef.current?.value);
        event.preventDefault();
        if(emailRef.current?.value===''){
            setConfirmMsg('입력 사항을 확인해주세요.'); 
            setConfirm(false);
            return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.AUTH}/exists-email?email=${emailRef.current?.value}`, {
            method: 'GET',
            headers: CommonHeader,
            cache: 'no-store'
        });

        const result: MessageData = await response.json();

        if (result.message === 'SUCCESS') {
            setConfirm(false);
            setConfirmMsg('사용 불가능한 이메일입니다.');
        } else {
            setConfirm(true);
            setConfirmMsg('사용 가능한 이메일입니다.');
        }

    };
    return (<>
        <form
            action={formAction}
        >

            <p className="form_label">이름</p>
            <input
                id='name'
                name='name'
                disabled={pending}
                className="form_input"
                type='name'
                placeholder='이름을 입력해주세요.'
                ref={nameRef}
                onChange={handleNameChange}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        nameRef.current?.focus();
                    }
                }}
            />

            {message.message.name && <p className="form_error_msg">{message.message.name}</p>}

            <div className="mt-[5%]" />
            <div className="flex flex-row items-end justify-between gap-x-5">
                <div className="flex flex-col">
                <p className="form_label">이메일</p>
                    <input
                        id='email'
                        name='email'
                        disabled={pending}
                        className="form_input"
                        type='email'
                        placeholder='이메일을 입력해주세요.'
                        ref={emailRef}
                        onChange={handleEmailChange}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                emailRef.current?.focus();
                            }
                        }}
                    />
                </div>
                <button
                    onClick={existsEmail}
                    className="text-black text-[14px] font-medium bg-white border-slate-100 border-2 shadow-md rounded-3xl h-[56px] p-2 hover:bg-slate-50 text-pretty"
                >이메일 중복 확인</button>
            </div>
            {confirm ? <p className="mt-2 ml-1 text-green-500">{confirmMsg}</p> : <p className="form_error_msg">{confirmMsg}</p>}
            {message.message.email && <p className="form_error_msg">{message.message.email}</p>}

            <div className="mt-[5%]" />
            <p className="form_label">비밀번호</p>
            <input
                id='password'
                name='password'
                disabled={pending}
                className="form_input"
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                ref={passwordRef}
                onChange={handlePasswordChange}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        passwordRef.current?.focus();
                    }
                }}
            />
            {message.message.password && <p className="form_error_msg">{message.message.password}</p>}

            <div className="mt-[5%]" />
            <p className="form_label">비밀번호 확인</p>
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

            <div className="mt-[5%]" />
            <p className="form_label">전화번호</p>
            <input
                type='text'
                name='phone'
                className="form_input"
                placeholder="전화번호를 다시 입력해주세요."
                ref={phoneRef}
                onChange={handlePhoneChange}
                disabled={pending}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        phoneRef.current?.focus();     
                    }
                }}
            />
            {message.message.phone && <p className="form_error_msg">{message.message.phone}</p>}

            <RegCheckBox />

            <div className="mt-[7%]" />
            <button type="submit"
            className="form_submit_btn"
            aria-disabled={pending}
            disabled={pending||confirm}
            >
            회원가입
        </button>
        </form>
    </>);
}
export default RegisterForm;