import { SERVER } from "@/constants/enums/API";
import { AnswerData } from "@/types/ToeicData";
import { NextRequest, NextResponse } from "next/server";

export interface I_ApiLevelSubmitRequest{
    level:number;
    userAnswer:AnswerData[];
}
export interface I_ApiLevelSubmitResponse{
    success:boolean;
    message?:string;
}

export async function POST(request:NextRequest){
    console.log(`3 - POST 경로 : /api/level 진입 성공`);

    const body=(await request.json()) as I_ApiLevelSubmitRequest;
    
    
    const {level,userAnswer}=Object.fromEntries(
        Object.entries(body).map(([key,value])=>
        [key,typeof value==='string' ? value.trim():value])
    ) as I_ApiLevelSubmitRequest;

    console.log("userAnswer: "+JSON.stringify(userAnswer));
    
    const token=request.cookies.get('accessToken')?.value;
    
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TOEIC}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify({level:level,userAnswer:userAnswer}),
    }).then(async (res)=>{
        if(res.ok){
            const json=await res.json();
            return NextResponse.json({success:true},{status:200});
        }else{
            const errorJson=await res.json();
            return NextResponse.json({success:false,message:errorJson.message},{status:res.status});
        }
    }).catch(async (err)=>{
        console.log(err);
        return NextResponse.json({success:false,message:err},{status:500});
    })
}