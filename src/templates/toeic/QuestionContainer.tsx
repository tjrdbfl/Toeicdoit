"use client";
import ToeicPlayer from '@/components/toeic/ToeicPlayer';
import SubmitButton from '@/components/button/SubmitBtn';
import ToeicHeader from '@/components/toeic/ToeicHeader';
import QuestionCard from '@/components/toeic/QuestionCard';
import { fetchItems } from '@/service/toeic/items';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useInView } from 'react-intersection-observer';


export default function QuestionContainer({ id }: { id: number }) {

    const [selections, setSelections] = useState<{ [key: number]: string }>({});

    const handleSelect = (questionId: number, value: string) => {
        setSelections((prevSelections) => ({ ...prevSelections, [questionId]: value }));
    }

    return (<>
        <div className="flex flex-col w-full items-center justify-center mb-10">
            {/* <QuestionCard
                key={item.id}
                id={item.id}
                question={"item.quesiton"}
                image={""}
                option={{
                    id: item.id,
                    choice1: "item.option.choice1",
                    choice2: "item.option.choice2",
                    choice3: "item.option.choice3",
                    choice4: "item.option.choice4"
                }}
                onSelect={handleSelect}
                take={true} answer={'a'} /> */}
        </div>

    </>);
}