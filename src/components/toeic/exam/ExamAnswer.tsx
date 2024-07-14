'use client';

import SubmitButton from "@/components/button/SubmitBtn";
import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";
import { ExamPart, allParts } from "@/constants/toeic/exam";
import { useNumberOfQuestionStore } from "@/store/exam/store";
import { useState, useEffect, useRef, useCallback } from "react";

const ExamAnswer = () => {
    const [selectedTab, setSelectedTab] = useState(allParts[0].label);
    const option1: string[] = ['a', 'b', 'c', 'd'];
    const option2: string[] = ['a', 'b', 'c'];
    const [selections, setSelections] = useState<{ [key: number]: string }>({});
    const [questionNumbers, setQuestionNumbers] = useState<{ [key: string]: number[] }>({});

    const partRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const {setCount}=useNumberOfQuestionStore();
    
    useEffect(() => {
        const numbers: { [key: string]: number[] } = {};
        let questionNumber = 1;
        allParts.forEach(part => {
            numbers[part.label] = Array.from({ length: part.question }, () => questionNumber++);
        });
        setQuestionNumbers(numbers);
        console.log("questionNumbers: "+JSON.stringify(numbers));

    }, []);


    const handleSelect = (questionId: number, value: string) => {
        setSelections((prevSelections) => ({ ...prevSelections, [questionId]: value }));
        setCount();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('selections', JSON.stringify(selections));
        //await submitLevelTest(formData);
    };

    const handleTabClick = (label: string) => {
        setSelectedTab(label);
        const partRef = partRefs.current[label];
        if (partRef) {
            partRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const setPartRef = useCallback((label: string) => (el: HTMLDivElement | null) => {
        partRefs.current[label] = el;
      }, []);
      
    return (
        <div className="bg-white border-slate-200 border-2 shadow-lg rounded-lg w-[250px] h-[800px] m-5 fixed right-0 lg:mr-[25%]">
            <nav className="p-2 flex justify-center">
                <ul className="flex">
                    {allParts.map((item) => (
                        <li
                            key={item.label}
                            onClick={() => handleTabClick(item.label)}
                            className={`cursor-pointer relative text-lg font-semibold bg-white border-slate-200 border-2 p-1 shadow-md
                            ${item.label === selectedTab
                                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600 after:transition-all after:duration-200"
                                : "text-black"
                            }`}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </nav>

            <form onSubmit={handleSubmit} method="POST">
                <ul className="mt-2 m-2 p-2 border-slate-200 border-2 h-[650px] rounded-lg shadow-md">
                    <ScrollArea className="transition-opacity duration-200 text-black w-full h-full">
                        {allParts.map((part: ExamPart) => (
                            <div 
                            key={part.label} 
                            ref={setPartRef(part.label)}
                            className="">
                                {questionNumbers[part.label]?.map((questionNumber) => (
                                    <li
                                        key={`question-li-${part.label}-${questionNumber}`}
                                        className="flex flex-row gap-x-2 border-slate-200 items-center border-2 mr-4"
                                    >
                                        <div
                                            key={`question-${part.label}-${questionNumber}`}
                                            className={`text-black text-xl font-semibold w-[52px] border-slate-200 border-r-2 py-1 px-2 bg-blue-50`}
                                        >
                                            {questionNumber}
                                        </div>
                                        <div key={`radio-group-${part.label}-${questionNumber}`} className="flex flex-row gap-x-2 py-1">
                                            {(part.label === 'P2' ? option2 : option1).map((option) => (
                                                <div key={`radio-fragment-${part.label}-${questionNumber}-${option}`} className="relative">
                                                    <input
                                                        id={`${questionNumber}-${option}`}
                                                        type='radio'
                                                        name={`${part.label}-${questionNumber}`}
                                                        value={option}
                                                        onChange={() => handleSelect(questionNumber, option)}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor={`${questionNumber}-${option}`}
                                                        className={`text-black w-6 h-6 text-xl rounded-full ring-1 ring-black flex items-center justify-center cursor-pointer 
                                                            hover:bg-blue-50 hover:ring-2 hover:ring-blue-600 
                                                            ${selections[questionNumber] === option ? 'bg-blue-200' : 'bg-white'}`}
                                                    >
                                                        {option.toUpperCase()}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        ))}
                        <ScrollBar />
                    </ScrollArea>
                </ul>
                <div className="mx-10 mt-5">
                    <SubmitButton label={"제출하기"} />
                </div>
            </form>
        </div>
    );
}

export default ExamAnswer;

