import { sendMessage } from "@/service/chat/actions";
import { ChatData } from "@/types/ChatData";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const ChatMessageContainer=({chat}:{chat:ChatData})=>{
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const sendMessageAction = sendMessage.bind(null, chat.id,chat.roomId);
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


    return(<>
     <form   
            id="chat_message"
            className="flex flex-row w-full h-[70px]"
            action={sendMessageAction}
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
                className="bg-black text-white w-[70px] h-[50px] text-lg hover:bg-zinc-800"
            >전송</button>
        </form>
    </>);
}
export default ChatMessageContainer;