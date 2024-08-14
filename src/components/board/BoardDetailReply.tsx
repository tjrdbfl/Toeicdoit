'use client';
import { deleteReply, modifyReply, saveReply } from "@/service/board/actions";
import { handleError } from "@/service/utils/error";
import { FreeMessageState, initialFreeMessageState, initialMessageState, MessageState } from "@/types/MessengerData";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "../button/SubmitBtn";
import { useFormState, useFormStatus } from "react-dom";

const BoardDetailReply = ({
    id, writer, content, create, index, update, boardId
}: {
    id: number,
    writer: string,
    content: string,
    create: string,
    index: number,
    update: boolean,
    boardId: number
}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [modify, setModify] = useState<boolean>(false);
    const [charCount, setCharCount] = useState(content.length);
    const [message, setMessage] = useState<FreeMessageState>(initialFreeMessageState);
    const modifyReplyWithBoardId=modifyReply.bind(null,boardId);
    const [state,formAction]=useFormState(modifyReplyWithBoardId,initialMessageState);

    const handleDeleteReply = async () => {
        const response = await deleteReply(id, boardId);

        if (response.message !== 'SUCCESS') {
            handleError(response.message);
        }
    }

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
        if (event.target.value.length < 1) {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    content: ["필수 항목입니다."],
                },
            }));
        } else {
            setMessage((prevState) => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    content: [""],
                },
            }));
        }
    };

    if(state.message!=='SUCCESS'){
        handleError(state.message);
    }else if(state.message==='SUCCESS'){
        setModify(false);
    }
    
    return (<div className={`w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
        <div className={`${index % 2 == 0 ? "justify-start" : "flex-row-reverse"} flex w-full`}>
            <div
                key={id}
                className={`${index % 2 == 0 ? "bg-blue-50 " : ""}rounded-xl shadow-md m-5 p-5 ${update ? 'w-[500px]' : 'w-[600px]'} border-slate-50 border-2`}>
                <div className={`flex flex-row gap-x-2 ${index % 2 == 0 ? "justify-start" : "justify-end"}`}>
                    <p className="text-black text-[14px] font-medium">
                        By.
                    </p>
                    <p className="text-blue-500 text-[14px] font-medium">
                        {writer}
                    </p>
                </div>

                <div className="mt-3" />
                {modify ?
                    <form 
                    action={formAction}
                    className="flex flex-row gap-x-4 items-end">
                        <div className="flex flex-col w-full">
                        <input
                        hidden
                        value={id}
                        name='replyId'
                        id='replyId'/>
                        <textarea
                            name="content"
                            id="content"
                            required
                            className="form_input"
                            placeholder={content}
                            defaultValue={content}
                            style={{ height: 150 }}
                            maxLength={1000}
                            onChange={handleContentChange}
                        />
                        <div className="flex flex-row justify-between mt-1">
                            {message.message.content && ( // error_message가 있으면 오류 메시지 표시
                                <p aria-live="polite" className="text-red-500 mt-1 text-[13px]">
                                    {message.message.content}
                                </p>
                            )}
                            <p className="text-slate-500 text-end font-medium text-[14px]">
                                {charCount}자/100자
                            </p>
                        </div>
                        </div>
                        <div className="w-[50px] mb-7">
                        <SubmitButton label={"수정"}/>
                        </div>
                    </form>

                    : <p className="text-black text-[14px]">
                        {content}
                    </p>
                }
                <div className="mt-3" />
                <p
                    className={`${index % 2 == 0 ? "text-start" : "text-end"} text-slate-400 text-[12px]`}
                >{create}</p>
            </div>
         {update && <div className="flex flex-row gap-x-1 items-end mb-7">
                <button
                    onClick={() => setModify(!modify)}
                    className="flex flex-row items-center">
                    <Image loading="lazy"
                        src={"/svgs/icons/pencil-icon.svg"}
                        alt={"pencil-icon"}
                        width={30}
                        height={30}
                        className="hover:bg-blue-50 rounded-md p-1 shadow-md border-slate-50 border-2"
                    />
                </button>
                <button
                    onClick={() => {
                        setOpen(!open)
                    }}
                    className="flex flex-row items-center">
                    <Image loading="lazy"
                        src={"/svgs/icons/red-close-icon.svg"}
                        alt={"red-close-icon"}
                        width={30}
                        height={30}
                        className="hover:bg-blue-50 rounded-md p-1 shadow-md border-slate-50 border-2"
                    />
                </button>
            </div>}
        </div>

        {open &&
            <dialog
                className="fixed inset-0 flex justify-center"
            >
                <div className="bg-white shadow-lg border-slate-50 border-2 p-5">
                    <p>정말로 삭제하시겠습니까?</p>
                    <div className="w-full flex flex-row justify-end mt-3">
                        <button
                            className="rounded-full hover:bg-blue-50 text-blue-500 p-2"
                            onClick={handleDeleteReply}
                        >삭제</button>
                        <button
                            className="rounded-full hover:bg-blue-50 text-blue-500 p-2"
                            onClick={() => setOpen(false)}>취소</button>
                    </div>

                </div>
            </dialog>}
    </div>);
}
export default BoardDetailReply;