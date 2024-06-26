"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { createPost } from "@/service/post/action";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
};
export default function PostForm() {
    const [state, formAction] = useFormState(createPost, initialState);
    const [charCount, setCharCount] = useState(0);
    const handleContentChange=(event:ChangeEvent<HTMLTextAreaElement>)=>{
        setCharCount(event.target.value.length);
    }
    
    return (<>
        <form
            action={formAction}
            className="p-5"
        >
            <div>
                <label htmlFor="category"
                    className="form_label"
                >카테고리</label>
                <div className="mt-5" />
                <select
                    name="category"
                    id="category"
                    required
                    className="form_input block w-full"
                >
                    <option value="공부법">공부법</option>
                    <option value="문의">문의</option>
                    <option value="시험 후기">시험 후기</option>
                </select>
            </div>

            <div className="mt-10">
                <label htmlFor="title"
                    className="form_label"
                >제목</label>
                <div className="mt-5" />
                <input type="text" name="title" id="title"
                    required
                    className="form_input"
                    placeholder="필수 항목입니다."
                />
            </div>

            <div className="mt-10">
                <label htmlFor="content"
                    className="form_label"
                >내용</label>
                <div className="mt-5" />
                <textarea
                    name="content"
                    id="content"
                    required
                    className="form_input"
                    placeholder="필수 항목입니다."
                    style={{ height: 400 }}
                    maxLength={1000}
                    onChange={handleContentChange}
                />
                <p className="text-slate-500 text-end text-lg font-medium">{charCount}자/1000자</p>
            </div>

            <div className="mt-10"/>
            <SubmitButton label={"등록하기"} />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    </>);
} 