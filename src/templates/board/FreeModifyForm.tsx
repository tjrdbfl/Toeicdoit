"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { deleteBoard, modifyBoard } from "@/service/board/action";
import { BoardData } from "@/types/BoardData";
import { initialFreeMessageState, FreeMessageState } from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";


export default function FreeModifyForm({ post }: { post: BoardData }) {

    const [state, formAction] = useFormState(modifyBoard, initialFreeMessageState);
    const [charCount, setCharCount] = useState(post.content.length);
    const [message, setMessage] = useState<FreeMessageState>(initialFreeMessageState);
    const [deleteResult, setDeleteResult] = useState<string>('');

    const router = useRouter();

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 8) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    title: ["최소 8자리 이상 입력해주세요."]
                },
            }));
        } else {
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
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    content: [""]
                },
            }));
        }
    }

    const handleDelete = async () => {
        const deleteResult = await deleteBoard(post.id);
        setDeleteResult(deleteResult.message);
    }

    useEffect(() => {
        console.log('state' + JSON.stringify(state));
        setMessage(state);
        if (state.result_message === 'SUCCESS') {  
            router.push(PG.INQUIRY_DETAILS);
            router.refresh();
        } else if (state.result_message === `${ERROR.SERVER_ERROR}`) {
            alert(state.result_message);
        }
    }, [state.result_message]);

    useEffect(() => {
        if (deleteResult === 'SUCCESS') {
            alert('삭제에 성공하셨습니다.');
            router.push(PG.INQUIRY_DETAILS);

        } else if (deleteResult === ERROR.SERVER_ERROR) {
            alert(ERROR.SERVER_ERROR);
        } else if (deleteResult === ERROR.INVALID_INPUT) {
            alert('삭제할 항목을 선택해주세요');
        }
    }, [deleteResult]);

    return (<>
        <form
            action={formAction}
            className="p-5"
        >
            <div className="flex flex-row justify-end gap-x-2 mt-5">
                <div className="w-[80px]">
                    <button
                        className="form_submit_btn"
                        onClick={handleDelete}
                    >삭제</button>
                </div>
                <div className="w-[80px]">
                    <SubmitButton label={"수정"}/>
                </div>
            </div>
            <div>
                <label htmlFor="category"
                    className="form_label"
                >카테고리</label>
                <div className="mt-3" />
                <select
                    name="category"
                    id="category"
                    required
                    className="form_input block w-full"
                >
                    {post.category === '공부법' ? <option selected value="공부법">공부법</option> : <option value="공부법">공부법</option>}
                    {post.category === '문의' ? <option selected value="공부법">문의</option> : <option value="문의">문의</option>}
                    {post.category === '시험 후기' ? <option selected value="시험 후기">시험 후기</option> : <option value="시험 후기">시험 후기</option>}
                </select>
            </div>
            <input
                id='boardId'
                name='boardId'
                hidden
                value={post.id} />

            <div className="mt-5">
                <label htmlFor="title"
                    className="form_label"
                >제목</label>
                <div className="mt-3" />
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleTitleChange}
                    required
                    className="form_input"
                    placeholder={post.title}
                    defaultValue={post.title}
                />
            </div>
            {message.message.title && <p aria-live="polite" className="text-red-500 mt-1">{message.message.title}</p>}

            <div className="mt-5">
                <label htmlFor="content"
                    className="form_label"
                >내용</label>
                <div className="mt-3" />
                <textarea
                    name="content"
                    id="content"
                    required
                    className="form_input"
                    placeholder={post.content}
                    defaultValue={post.content}
                    style={{ height: 250 }}
                    maxLength={1000}
                    onChange={handleContentChange}
                />
                <div className="flex flex-row justify-between mt-1">
                    {message.message.content && ( // error_message가 있으면 오류 메시지 표시
                        <p aria-live="polite" className="text-red-500 mt-1 text-[14px]">{message.message.content}</p>
                    )}
                    <p className="text-slate-500 text-end font-medium text-[14px]">{charCount}자/1000자</p>
                </div>
            </div>
        </form>
    </>);
} 