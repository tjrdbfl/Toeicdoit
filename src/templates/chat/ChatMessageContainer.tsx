import { ERROR } from "@/constants/enums/ERROR";
import { saveMessage } from "@/service/chat/actions";
import { handleError } from "@/service/utils/error";
import { ChatData } from "@/types/ChatData";
import { initialMessageState } from "@/types/MessengerData";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const ChatMessageContainer=({roomId}:{roomId:string})=>{
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const saveMessageByRoomId = saveMessage.bind(null,roomId);
    const [status,formAction]=useFormState(saveMessageByRoomId,initialMessageState);
    const { pending } = useFormStatus();
    
    const initialize=()=>{
        if(textareaRef.current){
            textareaRef.current.value='';
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
            initialize();
        }
    }

    useEffect(()=>{
        if(status.message!==ERROR.INVALID_INPUT){
            handleError(status.message);
        }
    },[status.message]);

    return(<>
     <form   
            id="chat_message"
            className="flex flex-row w-full h-[70px]"
            action={formAction}
        >
            <textarea
                ref={textareaRef}
                name="message"
                id="message"
                onKeyDown={handleKeyDown}
                disabled={pending}
                className="bg-white w-full h-[50px] max-h-[70px] scroll-area-chat p-3 leading-6"
            />
            <button
                disabled={pending}
                type="submit"
                onClick={initialize}
                className="bg-black text-white w-[70px] h-[50px] text-[14px] hover:bg-zinc-800"
            >전송</button>
        </form>
    </>);
}
export default ChatMessageContainer;