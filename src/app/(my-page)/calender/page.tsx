import { CommonHeader } from "@/config/headers";
import { BoardData } from "@/types/BoardData";
import { NextResponse } from "next/server";

export interface I_ApiPostSaveResponse{
    success:boolean;
    message?:string;
    board:BoardData;
}
const CalenderPage = async () => {

    let board:BoardData[] = [];
    try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_BOARD_API_URL}/board/findAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res)=>{
            if(res.ok){
                const json=await res.json();
                console.log(JSON.stringify(json));
                return NextResponse.json({success:true,board:json.board},{status:200});
            }else{
                const errorJson=await res.json();
                return NextResponse.json({success:false,message:errorJson.message},{status:res.status});
            }
        }).catch(async (err)=>{
            console.log(err);
            return NextResponse.json({success:false,message:err},{status:500})
        })

    } catch (err) {

    }


    console.log(JSON.stringify(board));
    return (<>
        <div className="text-black">
            {JSON.stringify(board)}
        </div>
    </>);
}
export default CalenderPage;