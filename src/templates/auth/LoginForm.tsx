'use client';

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from "@/app/api/login/route";
import { useApp } from "@/contexts/AppContext";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const LoginForm = () => {

    const { userData, setUserData } = useApp();

    //Utils
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    //Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    //State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loginIsComplete, setLoginIsComplete] = useState<boolean>(false);

    //Handlers
    const handleLogin = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setError('');

        try {

            if (!emailRef.current?.value || !passwordRef.current?.value)
                throw new Error('필수 항목입니다.');

            const payload: I_ApiUserLoginRequest = {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            };

            console.log(`1 - 페이로드 정보 : ${JSON.stringify(payload)}`);

            // console.log(`1 - App Routing GET`);
            // const response1=await fetch('/api/hello',{
            //     method:'GET',
            //     headers:{
            //         'Content-Type': 'application/json',
            //     }
            // });

            console.log(`2 - App Routing POST`);

            const response2=await fetch('/api/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email:"joe@test.com",password:"1234"}),
                //body:JSON.stringify(payload),
            })
           
            // const response = await fetch('http://localhost:8080/api/users/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'API-Key': process.env.DATA_API_KEY!,
            //     },
            //     body: JSON.stringify({ time: new Date().toISOString() }),
            // })

            // const data2 = await response.json()

            // console.log(`3 - 자바를 다녀 온 정보 :${JSON.stringify(data2)} `)

            // const data: I_ApiUserLoginResponse = await response.json();

            // console.log(`4 - login/route 에서 온 정보 :${JSON.stringify(data)} `)
            // // -------------------------------------------------------------
            // if (data.success) {
            //     setLoginIsComplete(true);
            //     if (redirect) {
            //         window.location.replace(redirect);
            //     } else {
            //         window.location.replace('/dashboard');
            //     }
            //     return;
            // }
            // throw new Error(data.message);
        } catch (error) {
            let mess = 'Something went wrong.';
            if (error instanceof Error) {
                mess = error.message;
            }
            setError(mess);
        } finally {
            setIsLoading(false);
        }
    };

    return (<>
        {loginIsComplete ? (<div>
            loading
        </div>) : (<>
            <div className="">
                <p className="form_label">이메일</p>
                <input className="form_input"
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    ref={emailRef}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            if (passwordRef.current) {
                                passwordRef.current.focus();
                            }
                        }
                    }}
                />
                {error && <p className="form_error_msg">{error}</p>}

                <div className="mt-[5%]" />
                <p className="form_label">비밀번호</p>
                <input 
                type="password"
                className="form_input"
                    placeholder="비밀번호를 입력해주세요."
                    ref={passwordRef}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
                {error && <p className="form_error_msg">{error}</p>}
                <div className="mt-[7%]" />
                <button
                    className="form_submit_btn"
                    onClick={handleLogin}>로그인</button>
            </div>
        </>)}

    </>);
}
export default LoginForm;