"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { saveFree } from "@/service/board/actions";
import { initialFreeMessageState, FreeMessageState } from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";



export default function FreeSaveForm() {

    const [charCount, setCharCount] = useState(0);

    const [state, formAction] = useFormState(saveFree, initialFreeMessageState);
    const { pending } = useFormStatus();
    const [message, setMessage] = useState<FreeMessageState>(initialFreeMessageState);
    const router=useRouter();

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 8) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    title: ["최소 8자리 이상 입력해주세요."]
                },
            }));
        }else{
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    title: [""]
                },
            }));
        }
    }

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
        if (event.target.value.length < 50) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    content: ["최소 50자리 이상 입력해주세요."]
                },
            }));
        }else{
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    content: [""]
                },
            }));
        }
    }

    useEffect(() => {
        console.log('state'+JSON.stringify(state));
        setMessage(state);

        if(state.result_message==='SUCCESS'){
            router.push(`${PG.FREE}`);
        }else if(state.result_message===`${ERROR.SERVER_ERROR}`){
            alert(state.result_message);
        }
    }, [state.result_message]);

    return (<>
        <form
            action={formAction}
            className="p-5"
        >
             <div className="flex flex-row gap-x-5 mt-5">
            <div className="flex flex-row gap-x-2 w-[100px]">
              <label htmlFor="category" className="form_label">
                카테고리
              </label>
              <p className="text-red-500">*</p>
            </div>

            <div className="mt-3" />
            <select
                    name="category"
                    id="category"
                    required
                    className="form_input block w-full"
                    disabled={pending}
                >
                    <option value="공부법">공부법</option>
                    <option value="문의">문의</option>
                    <option value="시험 후기">시험 후기</option>
                </select>
          </div>
            <p aria-live="polite" className="sr-only text-red-500 mt-1">{message.message.category}</p>


            <div className="flex flex-row gap-x-5 mt-10">
            <div className="flex flex-row gap-x-2 w-[100px]">
              <label htmlFor="title" className="form_label">
                제목
              </label>
              <p className="text-red-500">*</p>
            </div>

            <div className="mt-3" />
            <div className="flex flex-col w-full">
            <input type="text" name="title" id="title"
                    required
                    className="form_input"
                    placeholder="필수 항목입니다."
                    disabled={pending}
                    onChange={handleTitleChange}
                />
              {message.message.title && (
                <p aria-live="polite" className="text-red-500 mt-2 text-[13px]">
                  {message.message.title}
                </p>
              )}
            </div>
          </div>
            
          <div className="flex flex-row gap-x-5 mt-10">
          <div className="flex flex-row gap-x-2 w-[100px]">
          <label htmlFor="content" className="form_label">
          내용
            </label>
            <p className="text-red-500">*</p>
          </div>

          <div className="mt-3" />
          <div className="flex flex-col w-full">
          <textarea
                    name="content"
                    id="content"
                    required
                    className="form_input"
                    placeholder="필수 항목입니다."
                    style={{ height: 250 }}
                    maxLength={1000}
                    onChange={handleContentChange}
                    disabled={pending}
                />
            <div className="flex flex-row justify-between mt-1">
            {message.message.content && ( // error_message가 있으면 오류 메시지 표시
              <p aria-live="polite" className="text-red-500 mt-1 text-[13px]">
                {message.message.content}
              </p>
            )}
            <p className="text-slate-500 text-end font-medium text-[14px]">
              {charCount}자/1000자
            </p>
          </div>
          </div>
        </div>

            <div className="mt-10" />
            {/* <SubmitButton label={"등록하기"} /> */}

        </form>
    </>);
} 