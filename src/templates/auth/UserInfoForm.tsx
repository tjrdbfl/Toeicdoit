'use client';

import ModalCloseBtn from "@/components/button/ModalCloseBtn";
import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { modifyUserInfo } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { useUserInfoStore } from "@/store/auth/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export interface UserInfoMessage {
    name_message?:string;
    phone_message?:string;
    result_message: string;
}
const initialState: UserInfoMessage = {
    name_message: "" || undefined,
    phone_message: "" || undefined,
    result_message: "",
}

const UserInfoForm = ({email,name,phone}:{
    email:string|undefined;
    name:string|undefined;
    phone:string|undefined;
   
}) => {

    const { pending } = useFormStatus();
    const [message, setMessage] = useState<UserInfoMessage>(initialState);
    const router = useRouter();
    const [state, formAction] = useFormState(modifyUserInfo, initialState);
    const [click,setClick]=useState<boolean>(false);
    const [changeName,setChangeName]=useState<string>('');
    //Refs
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState,
                    name_message: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState,
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
                    ...prevState,
                    phone_message: ['필수 항목입니다.']
                }
            }))
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState,
                    phone_message: [""]
                },
            }));
        }
    };

    useEffect(() => {
       
        console.log('state' + JSON.stringify(state));
        setMessage((prevState) => ({
            ...prevState,
            message: {
                name_message:state.name_message,
                phone_message: state.name_message,
            },
        }));

        if (state.result_message === 'SUCCESS') {
            useUserInfoStore.setState({
                name:name,
            });

            router.push(`${PG.USER_INFO}`);

        } else{
            handleError(state.result_message);
        }
    }, [state.name_message,state.phone_message, state.result_message,click]);


    return (<>
        <dialog
            className="flex justify-center items-center"
        >
            <div
                className="z-20 bg-white w-[400px] h-auto shadow-md border-slate-100 border-2 p-4 rounded-xl"
            >
                <div className="w-full flex justify-end">
                <ModalCloseBtn url={`${PG.USER_INFO}`} />
                </div>
                <form
                    action={formAction}
                >
                        <div className="flex flex-row items-end justify-between gap-x-5">
                        <div className="flex flex-col">
                            <p className="form_label mb-2">이메일</p>
                            <input
                                id='email'
                                name='email'
                                disabled={true}
                                className="form_input"
                                type='email'
                                placeholder={email}
                                value={email}
                                aria-disabled={true}
                            />
                        </div>

                    </div>
                    <p className="form_error_msg">변경 불가능한 항목입니다.</p>
                    <div className="mt-[5%]" />
                    <p className="form_label mb-2">이름</p>
                    <input
                        id='name'
                        name='name'
                        disabled={pending}
                        className="form_input"
                        type='name'
                        placeholder={'필수 항목입니다.'}
                        defaultValue={name}
                        ref={nameRef}
                        onChange={handleNameChange}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                nameRef.current?.focus();
                                setChangeName(e.currentTarget.value);
                            }
                        }}
                    />

                    {message.name_message && <p className="form_error_msg">{message.name_message}</p>}

                    <div className="mt-[5%]" />
                    <p className="form_label mb-2">전화번호</p>
                    <input
                        type='text'
                        name='phone'
                        className="form_input"
                        placeholder={'필수 항목입니다.'}
                        defaultValue={phone}
                        ref={phoneRef}
                        onChange={handlePhoneChange}
                        disabled={pending}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                phoneRef.current?.focus();
                            }
                        }}
                    />
                    {message.phone_message && <p className="form_error_msg">{message.phone_message}</p>}

                    <div className="mt-[7%]" />
                    <SubmitButton label={"수정하기"} click={click} setClick={setClick}/>
                </form>
            </div>
        </dialog>

    </>);
}
export default UserInfoForm;