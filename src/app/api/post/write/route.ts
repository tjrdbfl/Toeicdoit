import { NextRequest, NextResponse } from "next/server";

export interface I_ApiPostWriteRequest{
    title?:string;
    content?:string;
    category?:string;
}
export interface I_ApiPostWriteResponse{
    success:boolean;
    message?:string;
}
export async function POST(request:NextRequest){
    console.log(`3 - POST 경로 : /api/post/write 진입 성공`);

    const body=(await request.json()) as I_ApiPostWriteRequest;

    const {category,title,content}=Object.fromEntries(
        Object.entries(body).map(([key,value])=>
        [key,typeof value ==='string' ? value.trim():value])
    ) as I_ApiPostWriteRequest;

    const token=request.cookies.get('accessToken')?.value;

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/write`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ category: category,title:title,content:content }),
          cache: 'no-store'
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
        return NextResponse.json({success:false,message:err},{status:500})
    })
}