"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/SubmitBtn";
import { usePathname } from "next/navigation";
import { saveReply } from "@/service/board/actions";
import { handleError } from "@/service/utils/error";

const initialState = {
    message: "",
};
const BoardWriteReply = ({name,boardId,page}:{
    name:string,
    boardId:number,
    page:number
}) => {

    console.log('BoardWriteReply: '+boardId);
    
    const saveReplyByBoardId=saveReply.bind(null,boardId,page);
    const [state, formAction] = useFormState(saveReplyByBoardId, initialState);
    const [charCount, setCharCount] = useState(0);
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
    }
    const [click,setClick]=useState<boolean>(false);

    useEffect(()=>{
        if(state.message!=='SUCCESS'){
            handleError(state.message);
        }
    },[click]);
    
    return (<>
        <p className="text-black">작성자 : {name}</p>
        <div className="mt-5" />
        <form
            action={formAction}
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
                    click={click}
                    setClick={setClick}
                    />
                    </div>
            </div>
        </form>
    </>);
}
export default BoardWriteReply;