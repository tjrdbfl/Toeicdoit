'use client';
import RegCheckBox from "@/components/auth/RegCheckBox";
import { PG } from "@/constants/enums/PG";
import { existByEmail, register } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
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

const RegisterForm = () => {

    const { pending } = useFormStatus();
    const [message, setMessage] = useState<RegisterMessageState>(initialState);
    const [error, setError] = useState<string>('');
    const [confirm, setConfirm] = useState<boolean>(false);
    const [confirmMsg, setConfirmMsg] = useState<string>('');
    const router = useRouter();

    const registerByConfirmEmail = register.bind(null, confirm);

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

    const handleSubmit = async (formData: FormData) => {
        const result: RegisterMessageState = await registerByConfirmEmail(initialState, formData);

        console.log('handleSubmit: ' + JSON.stringify(result));

        if (result.message) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    email: result.message.email || [],
                    password: result.message.password || [],
                    name: result.message.name || [],
                    phone: result.message.phone || [],
                },
                result_message: result.result_message,
            }));
        }

        if (!confirm) {
            alert('이메일 중복을 확인해주세요.');
        }
        else if (result.result_message === 'SUCCESS') {
            console.log('1234');
            alert('회원가입을 성공하셨습니다.');
            router.push(`${PG.LOGIN}`);
        } else {
            handleError(result.result_message);
        }
    };

    const existsEmail = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        if (emailRef.current?.value === '') {
            setConfirmMsg('입력 사항을 확인해주세요.');
            setConfirm(false);
            return;
        }

        const response = await existByEmail(emailRef.current?.value);

        console.log('response: ' + JSON.stringify(response));
        if (response.message === 'SUCCESS') {
            setConfirm(false);
            setConfirmMsg('사용 불가능한 이메일입니다.');
        } else if(response.message==='FAILURE'){
            setConfirm(true);
            setConfirmMsg('사용 가능한 이메일입니다.');
        }else {
            handleError(response.message);
        }

    };

    return (<>
        <form
            action={handleSubmit}
        >

            <p className="form_label">이름</p>
            <div className="mt-3" />
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

            {message.message.name !== undefined && message.message.name?.length > 0 && (
                <p aria-live="polite" className="form_error_msg">{message.message.name[0]}</p>
            )}

            <div className="mt-[5%]" />
            <div className="flex flex-row items-end justify-between gap-x-5">
                <div className="flex flex-col">
                    <p className="form_label">이메일</p>
                    <div className="mt-3" />

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
            {confirm ? <p className="mt-2 ml-1 text-green-500 text-[14px]">{confirmMsg}</p> : <p className="form_error_msg">{confirmMsg}</p>}
            {confirm && message.message.email!==undefined && message.message.email?.length > 0 && (
                <p aria-live="polite" className="form_error_msg">{message.message.email[0]}</p>
            )}

            <div className="mt-[5%]" />
            <p className="form_label">비밀번호</p>
            <div className="mt-3" />

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
            {message.message.password!==undefined && message.message.password?.length > 0 && (
                <p aria-live="polite" className="form_error_msg">{message.message.password[0]}</p>
            )}

            <div className="mt-[5%]" />
            <p className="form_label">비밀번호 확인</p>
            <div className="mt-3" />

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
            <div className="mt-3" />

            <input
                type='text'
                name='phone'
                className="form_input"
                placeholder="예) 01012345678"
                ref={phoneRef}
                onChange={handlePhoneChange}
                disabled={pending}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        phoneRef.current?.focus();
                    }
                }}
            />
            {message.message.phone!==undefined && message.message.phone?.length > 0 && (
                <p aria-live="polite" className="form_error_msg">{message.message.phone[0]}</p>
            )}

            <RegCheckBox />

            <div className="mt-[7%]" />
            <button type="submit"
                className="form_submit_btn"
                disabled={pending}
            >
                회원가입
            </button>
        </form>
    </>);
}
export default RegisterForm;