import { NextRequest, NextResponse } from "next/server";

export interface I_ApiPostReplyRequest{
    writer:string;
    content:string;
}
export interface I_ApiPostReplyResponse{
    success:boolean;
    message?:string;
}
export async function POST(request:NextRequest){
    console.log(`3 - POST 경로 : /api/post/write 진입 성공`);

    const body=(await request.json()) as I_ApiPostReplyRequest;

    const {writer,content}=Object.fromEntries(
        Object.entries(body).map(([key,value])=>
        [key,typeof value ==='string' ? value.trim():value])
    ) as I_ApiPostReplyRequest;

    const token=request.cookies.get('accessToken')?.value;

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/reply`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ writer:writer,content:content }),
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