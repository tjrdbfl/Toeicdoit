'use server';

import { CommonHeader } from "@/config/headers";
import { ITEMS_PER_PAGE, ToeicDataPublic } from "@/types/ToeicData";
import { redirect } from "next/navigation";

export async function fetchQuestions({ 
    pageParam = 1, level
}:{
    pageParam:number,level:number
}) {

    console.log('page: ', pageParam);
    console.log('level: ', level);

    let questions: ToeicDataPublic[] = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/toeic?level=${level}&page=${pageParam}`, {
            method: 'GET',
            headers: CommonHeader,
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch question');
        }

        const data = await response.json();

        if (data && data.success) {
            questions = data.questions;
        } else {
            console.error('Failed to get response data', data.message);
        }

        const nextPage = data.questions.length === ITEMS_PER_PAGE ? pageParam + 1 : null;

        return {
            data: questions,
            currentPage: pageParam,
            nextPage: nextPage,
        };

    } catch (err) {
        console.log('Failed to get level: ', err);
        return {
            data: questions,
            currentPage: pageParam,
            nextPage: null,
        };
    }
}

export async function submitLevelTest(formData: FormData){
    'use server';

    console.log('submitLevelTest');
    const selections=JSON.parse(formData.get('selections') as string);
    const level=formData.get('level');
    const take=JSON.parse(formData.get('take') as string);

    const userAnswer=Object.keys(selections).map(key=>({
        id:parseInt(key),
        answer:selections[key]
    }))
    console.log("selections: " + JSON.stringify(userAnswer));
    console.log("level: "+level);
    console.log("take: "+take);

    if(take){
        redirect('/score');
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/level`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify({level:Number(level),
                userAnswer:userAnswer}),
            cache:"no-store"
        })

        if(!response.ok){
            throw new Error('Failed to submit selection');
        }

        const data=await response.json();

        if(data.status===200){
            redirect('/result');
        }

        alert('답안 제출에 오류가 생겼습니다. 다시 제출해주세요.');
        redirect('/result');
    }catch(err){
        console.error('Error submitting selections:', err);
    }
}