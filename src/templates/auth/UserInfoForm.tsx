// 'use client';

// import { ERROR } from "@/constants/enums/ERROR";
// import { PG } from "@/constants/enums/PG";
// import { modifyUserInfo } from "@/service/auth/action";
// import { UserDataPublic } from "@/types/UserData";
// import { useRouter } from "next/navigation";
// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";

// export interface UserInfoMessageState {
//     name_message?:string;
//     phone_message?:string;
//     result_message: string;
// }
// const initialState: UserInfoMessageState = {
//     name_message: "" || undefined,
//     phone_message: "" || undefined,
//     result_message: "",
// }

// const UserInfoForm = ({userInfo}:{userInfo:UserDataPublic}) => {

//     const { pending } = useFormStatus();
//     const [message, setMessage] = useState<UserInfoMessageState>(initialState);
//     const [error, setError] = useState<string>('');
//     const [confirm, setConfirm] = useState<boolean>(false);
//     const [confirmMsg, setConfirmMsg] = useState<string>('');
//     const router = useRouter();
//     const [state, formAction] = useFormState(modifyUserInfo, initialState);

//     //Refs
//     const nameRef = useRef<HTMLInputElement>(null);
//     const phoneRef = useRef<HTMLInputElement>(null);

//     const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.value.length < 1) {
//             setMessage((prevState) => ({
//                 ...prevState,
//                 message: {
//                     ...prevState.message,
//                     name: ['필수 항목입니다.']
//                 }
//             }))
//         } else {
//             setMessage((prevState) => ({
//                 ...prevState,
//                 message: {
//                     ...prevState.message,
//                     name: [""]
//                 },
//             }));
//         }
//     };
//     const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.value.length < 1) {
//             setMessage((prevState) => ({
//                 ...prevState,
//                 message: {
//                     ...prevState.message,
//                     phone: ['필수 항목입니다.']
//                 }
//             }))
//         } else {
//             setMessage((prevState) => ({
//                 ...prevState,
//                 message: {
//                     ...prevState.message,
//                     phone: [""]
//                 },
//             }));
//         }
//     };

//     useEffect(() => {
//         setConfirm(false);
//         setConfirmMsg('');
//         console.log('state' + JSON.stringify(state));
//         setMessage(state);

//         if (state.result_message === 'SUCCESS') {
//             router.push(`${PG.LOGIN}`);
//         } else if (state.result_message === `${ERROR.SERVER_ERROR}`) {
//             alert(state.result_message);
//         }
//     }, [state.result_message, state.message.name, state.message.phone]);


//     return (<>
//         <dialog
//             className="flex justify-center items-centerz-50"
//         >
//             <div
//                 className="bg-white w-[500px] h-auto shadow-lg border-slate-200 border-2 p-3"
//             >
//                 <form
//                     action={formAction}
//                 >
//                     <p className="form_label">이름</p>
//                     <input
//                         id='name'
//                         name='name'
//                         disabled={pending}
//                         className="form_input"
//                         type='name'
//                         placeholder={userInfo.name}
//                         defaultValue={userInfo.name}
//                         ref={nameRef}
//                         onChange={handleNameChange}
//                         onKeyDown={e => {
//                             if (e.key === 'Enter') {
//                                 nameRef.current?.focus();
//                             }
//                         }}
//                     />

//                     {message.message.name && <p className="form_error_msg">{message.message.name}</p>}

//                     <div className="mt-[5%]" />
//                     <div className="flex flex-row items-end justify-between gap-x-5">
//                         <div className="flex flex-col">
//                             <p className="form_label">이메일</p>
//                             <input
//                                 id='email'
//                                 name='email'
//                                 disabled={true}
//                                 className="form_input"
//                                 type='email'
//                                 placeholder={userInfo.email}
//                                 value={userInfo.email}
//                                 aria-disabled={true}
//                             />
//                         </div>

//                     </div>
//                     <p className="form_error_msg">변경 불가능한 항목입니다.</p>

//                     <div className="mt-[5%]" />
//                     <p className="form_label">전화번호</p>
//                     <input
//                         type='text'
//                         name='phone'
//                         className="form_input"
//                         placeholder={userInfo.phone}
//                         defaultValue={userInfo.phone}
//                         ref={phoneRef}
//                         onChange={handlePhoneChange}
//                         disabled={pending}
//                         onKeyDown={e => {
//                             if (e.key === 'Enter') {
//                                 phoneRef.current?.focus();
//                             }
//                         }}
//                     />
//                     {message.message.phone && <p className="form_error_msg">{message.message.phone}</p>}

//                     <div className="mt-[7%]" />
//                     <button type="submit"
//                         className="form_submit_btn"
//                         aria-disabled={pending}
//                         disabled={pending || confirm}
//                     >
//                         회원가입
//                     </button>
//                 </form>
//             </div>
//         </dialog>

//     </>);
// }
// export default UserInfoForm;