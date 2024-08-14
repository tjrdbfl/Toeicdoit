'use client';

import { useToeicAnswerStore } from "@/store/toeic/store";
import { OptionData } from "@/types/ToeicData";
import { useEffect, useState } from "react";

const ToeicAnswer = ({op,page}:{op:OptionData,page:number}) => {  
    const [selected, setSelected] = useState<string>('');

    const select = op.choice4===''? ['A', 'B', 'C']: ['A', 'B', 'C', 'D'];

    useEffect(()=>{
        console.log('selected: '+selected);
        console.log('select: '+select[1]);
    },[selected]);

    const {answers,setAnswer}=useToeicAnswerStore();

    useEffect(()=>{
        console.log('answers: '+JSON.stringify(answers));
    },[answers]);
    
    return (<>
    <div className="flex flex-col">
        {select.map((choice,index)=>(
            <div key={index} className="flex flex-row">
                <input
                id={`${op.id}-${choice}`}
                type='radio'
                name={`${op.id}`}
                value={choice}
                onChange={()=>{
                    setSelected(choice);
                    setAnswer(page===0? 1: page,choice);
                }}
                checked={selected===choice}
                className="hidden"
                />
                 <label
                        htmlFor={`${op.id}-${choice}`} 
                        className={`flex flex-row gap-x-5 w-full p-5 items-center ${answers.filter((an)=>an.id===page).map((an)=>an.answer).toString() === choice ? 'bg-blue-50' : 'bg-white'}`}
                    >

                        <div className={`text-black w-10 h-10 text-xl rounded-full ring-1 ring-black flex items-center justify-center cursor-pointer                                       
                 
                ${answers.filter((an)=>an.id===page).map((an)=>an.answer).toString() === choice ? 'bg-blue-500 ring-white text-white' : 'bg-white'}`}>
                            {choice}
                        </div>
                        <p
                            className={`font-medium ${answers.filter((an)=>an.id===page).map((an)=>an.answer).toString() === choice ? 'text-blue-500' : 'text-black'}`}
                        >{op[`choice${index + 1}` as keyof typeof op]}</p>
                    </label>
            </div>
        ))}
    </div>
    </>);
}
export default ToeicAnswer;