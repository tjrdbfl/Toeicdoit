import { SERVER } from "@/constants/enums/API";
import { I_ApiBoardRequest, I_ApiBoardResponse } from "@/types/BoardData";
import { MessageData } from "@/types/MessengerData";
import { NextRequest, NextResponse } from "next/server";

export interface I_ApiFreeRequest {
    userId:number,
    title: string;
    content: string;
    type: string;
    category:string;
}
export interface I_ApiFreeSaveResponse {
    success: boolean;
    message?: MessageData;
}
export interface I_ApiBoardDeleteRequest{
    id:number;
    type:string;
}
export async function POST(request: NextRequest) {
    console.log(`3 - POST 경로 : /api/post/save 진입 성공`);

    // const body = (await request.json()) as I_ApiFreeRequest;

    // const { category, title, content } = Object.fromEntries(
    //     Object.entries(body).map(([key, value]) =>
    //         [key, typeof value === 'string' ? value.trim() : value])
    // ) as I_ApiFreeRequest;

    // const token = request.cookies.get('accessToken')?.value;

    // //${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/board/save
    // return await fetch(`${process.env.NEXT_PUBLIC_BOARD_API_URL}/board/save`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({ category: category, title: title, content: content }),
    //     cache: 'no-store'

    // }).then(async (res) => {
    //     if (res.ok) {
    //         const json = await res.json();
    //         return NextResponse.json({ success: true }, { status: 200 });
    //     } else {
    //         const errorJson = await res.json();
    //         return NextResponse.json({ success: false, message: errorJson.message }, { status: res.status });
    //     }
    // }).catch(async (err) => {
    //     console.log(err);
    //     return NextResponse.json({ success: false, message: err }, { status: 500 })
    // })
}
export async function PUT(request: NextRequest) {
    console.log(`3 - POST 경로 : /api/post/modify 진입 성공`);

    const body = (await request.json()) as I_ApiFreeRequest;

    // const { id, category, title, content } = Object.fromEntries(
    //     Object.entries(body).map(([key, value]) =>
    //         [key, typeof value === 'string' ? value.trim() : value])
    // ) as I_ApiFreeRequest;

    // const token = request.cookies.get('accessToken')?.value;

    // //${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/board/modify
    // return await fetch(`${process.env.NEXT_PUBLIC_BOARD_API_URL}/board/modify`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({ id: id, category: category, title: title, content: content }),
    //     cache: 'no-store'

    // }).then(async (res) => {
    //     if (res.ok) {
    //         const json = await res.json();
    //         return NextResponse.json({ success: true }, { status: 200 });
    //     } else {
    //         const errorJson = await res.json();
    //         return NextResponse.json({ success: false, message: errorJson.message }, { status: res.status });
    //     }
    // }).catch(async (err) => {
    //     console.log(err);
    //     return NextResponse.json({ success: false, message: err }, { status: 500 })
    // })
}
export async function GET(request: NextRequest) {
    console.log(`3 - POST 경로 : /api/post/my-page 진입 성공`);

    const { searchParams } = new URL(request.url);
    const currentPage = Number(searchParams.get('currentPage')) || 1;
    const offset = Number(searchParams.get('offset')) || 0;

    const token = request.cookies.get('accessToken')?.value;

    //${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/board/findAll
    return await fetch(`${process.env.NEXT_PUBLIC_BOARD_API_URL}/board/findAll?currentPage=${currentPage}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'

    }).then(async (res) => {
        if (res.ok) {
            const json: I_ApiBoardResponse = await res.json();
            return NextResponse.json({ success: true, board: json.Boards }, { status: 200 });
        } else {
            const errorJson = await res.json();
            return NextResponse.json({ success: false, message: errorJson.message }, { status: res.status });
        }
    }).catch(async (err) => {
        console.log(err);
        return NextResponse.json({ success: false, message: err }, { status: 500 })
    })
}
export async function DELETE(request:NextRequest){
    console.log(`/api/post/my-page/delete 진입 성공`);

    const {searchParams}=new URL(request.url);  

}