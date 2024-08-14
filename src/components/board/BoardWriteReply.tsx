"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/SubmitBtn";
import { usePathname } from "next/navigation";
import { saveReply } from "@/service/board/actions";
import { handleError } from "@/service/utils/error";

const initialState = {
    message: "",
};
const BoardWriteReply = ({ name, boardId, page }: {
    name: string,
    boardId: number,
    page: number
}) => {

    console.log('BoardWriteReply: ' + boardId);
    const formRef = useRef<HTMLFormElement>(null);

    const saveReplyByBoardId = saveReply.bind(null, boardId, page);
    const [charCount, setCharCount] = useState(0);
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
    }

    const handleSubmit = async (formData: FormData) => {

        const result = await saveReplyByBoardId(initialState, formData);
    
        if (result.message === 'SUCCESS') {
            formRef.current?.reset();
            setCharCount(0);
        }else{
            handleError(result.message);
        }
    
    };

    return (<>
        <p className="text-black">작성자 : {name}</p>
        <div className="mt-5" />
        <form
            ref={formRef}
            action={handleSubmit}
            className=""
        >
            <input
                name="writerName"
                id="writerName"
                required
                hidden
                value={name}
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
            <div className="flex flex-row justify-between mt-4">
                <p className="text-slate-500 text-end text-[14px] font-medium">{charCount}자/100자</p>
                <div className="w-28">
                    <SubmitButton
                        label={"등록하기"}
                        />
                </div>
            </div>
        </form>
    </>);
}
export default BoardWriteReply;