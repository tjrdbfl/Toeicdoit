"use client";

import { createReply } from "@/service/post/action";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/SubmitBtn";
import { usePathname } from "next/navigation";

const initialState = {
    message: "",
};
const BoardWriteReply = () => {
    const pathname = usePathname();
    const [state, formAction] = useFormState((prevState:{message:string}, formData:FormData) => createReply(prevState, formData, pathname), initialState);
    const [charCount, setCharCount] = useState(0);
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
    }
    
    return (<>
        <p className="text-black text-xl">작성자 : </p>
        <div className="mt-5" />
        <form
            action={formAction}
            className=""
        >
            <input
            name="writer"
            id="writer"
            required
            hidden
            defaultValue={"작성자"}
            />
            <textarea
                name="content"
                id="content"
                required
                className="form_input"
                placeholder="필수 항목입니다."
                style={{ height: 200 }}
                maxLength={100}
                onChange={handleContentChange}
            />
            <div className="flex flex-row justify-between mt-5">
                <p className="text-slate-500 text-end text-lg font-medium">{charCount}자/100자</p>
                <div className="w-32"> 
                    <SubmitButton label={"등록하기"} /></div>
            </div>
        </form>
    </>);
}
export default BoardWriteReply;