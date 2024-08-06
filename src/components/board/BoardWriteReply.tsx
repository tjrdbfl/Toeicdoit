"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/SubmitBtn";
import { usePathname } from "next/navigation";
import { createReply } from "@/service/board/actions";

const initialState = {
    message: "",
};
const BoardWriteReply = ({name}:{
    name:string
}) => {
    const pathname = usePathname();
    const [state, formAction] = useFormState((prevState:{message:string}, formData:FormData) => createReply(prevState, formData, pathname), initialState);
    const [charCount, setCharCount] = useState(0);
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
    }
    
    return (<>
        <p className="text-black">작성자 : {name}</p>
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
            <div className="flex flex-row justify-between mt-2">
                <p className="text-slate-500 text-end text-[14px] font-medium">{charCount}자/100자</p>
                <div className="w-28"> 
                    {/* <SubmitButton label={"등록하기"} /> */}
                    </div>
            </div>
        </form>
    </>);
}
export default BoardWriteReply;