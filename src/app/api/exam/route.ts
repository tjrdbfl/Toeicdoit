import { SERVER } from "@/constants/enums/API";
import { MessageData } from "@/types/MessageData";
import { NextRequest, NextResponse } from "next/server";

export interface I_ApiExamRequest{
    query:string;
}
export interface I_ApiExamResponse{
    success:boolean;
    totalPages?:number;
    message?:MessageData;
}

export async function POST(request:NextRequest){
    console.log(`3 - POST 경로 : /api/exam 진입 성공`);

    const body=(await request.json()) as I_ApiExamRequest;

    const {query}=Object.fromEntries(
        Object.entries(body).map(([key,value])=>
        [key,typeof value==='string' ? value.trim():value])
    ) as I_ApiExamRequest;

    const token=request.cookies.get('accessToken')?.value;

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TOEIC}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ query: query }),
          cache: 'no-store'
    }).then(async (res)=>{
        if(res.ok){
            const json=await res.json();
            return NextResponse.json({success:true,totalPages:json.data},{status:200});
        }else{
            const errorJson=await res.json();
            return NextResponse.json({success:false,message:errorJson.message},{status:res.status});
        }
    }).catch(async (err)=>{
        console.log(err);
        return NextResponse.json({success:false,message:err},{status:500})
    })
}
