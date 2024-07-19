'use client'

import { useToeicAnswerStore } from "@/store/toeic/store";
import { useEffect } from "react";

const ToeicSubmitBtn = () => {
    const {answers}=useToeicAnswerStore();
    
    console.log('answer: '+answers);
    
    return (<>
        <button
            onClick={() => {}}
            className="bg-blue-100 hover:bg-blue-50 text-black font-medium p-5 rounded-t-3xl rounded-bl-3xl"
        >
            제출하기
        </button>
    </>);
}
export default ToeicSubmitBtn;