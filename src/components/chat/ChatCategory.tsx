'use client';
import { chatCategory } from "@/constants/chat/constant";

const ChatCategory = () => {

    return (<>
        <ul
            className="flex flex-wrap gap-x-2 gap-y-3">
            {chatCategory.map((category) => {
                return (
                    <button
                        onClick={()=>{}}
                        key={category.id}
                        className="text-black bg-white shadow-lg rounded-full py-3 px-4 hover:bg-slate-50"
                    >
                        {category.title}
                    </button>
                );
            })}
        </ul>
    </>);
}
export default ChatCategory;