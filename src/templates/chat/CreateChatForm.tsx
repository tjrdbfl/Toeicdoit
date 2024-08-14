"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { chatCategory, chatCategoryType } from "@/constants/chat/constant";
import { ERROR } from "@/constants/enums/ERROR";
import { saveRoom } from "@/service/chat/actions";
import { handleError } from "@/service/utils/error";
import { initialMessageState } from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";


export default function CreateChatForm({setCreate}:{
    setCreate: Dispatch<SetStateAction<boolean>>
}) {
    const [selected, setSelected] = useState<string[]>([]);

    const { pending } = useFormStatus();
    const saveRoomWithCategory=saveRoom.bind(null,selected);
    const [state, formAction] = useFormState(saveRoomWithCategory, initialMessageState);
    const router=useRouter();

    const handleClick = (category: string) => {
        setSelected(prevCategories => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(item => item != category);
            } else {
                return [...prevCategories, category];
            }
        })
        console.log(selected);
    }

    useEffect(() => {
        console.log('state.message: '+state.message);

        if(state.message==='SUCCESS'){
            setCreate(false);
        }else{
            handleError(state.message);
        }

    }, [state.message]);

    return (<>
        <form
            action={formAction}
            className="mt-5"
        >
            <div className="w-full h-full">
                <label htmlFor="roomCategories"
                    className="form_label"
                >카테고리 선택하기</label>

                <ul
                    className="flex flex-wrap gap-x-2 gap-y-3 mt-5">
                    {chatCategory.map((category, index) => {
                        return (
                            category.id!==0 && <button
                            type="button"
                            onClick={() => { handleClick(category.category) }}
                            key={category.id}
                            className={`text-black ${selected.includes(category.category) ? 'bg-slate-200': 'bg-white'} shadow-lg rounded-full py-3 px-4 hover:bg-slate-50`}
                        >
                            {category.title}
                        </button>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-5">
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

            <div className="mt-10" />
            <SubmitButton disabled={pending} label={"등록하기"} />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    </>);
} 