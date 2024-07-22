
import { BoardData } from "@/types/BoardData";
import CalendarContainer from "@/templates/my-page/CalendarContainer";
import { cookies } from "next/headers";
import { CommonHeader } from "@/config/headers";
import { IEvent } from "@/types/TransactionData";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER_API } from "@/constants/enums/API";

export interface I_ApiFreeSaveResponse{
    success:boolean;
    message?:string;
    board:BoardData;
}
export default async function CalendarPage(){
    
    const cookieStore=cookies();
    //const userId=cookieStore.get('userId');

    const userId=1;
    console.log(JSON.stringify(userId));
    let event:IEvent[]=[];
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.CALENDAR}/list?id=${userId}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        });

        const result:IEvent[]=await response.json();
        
        if(result){
            console.log(result);
            event = result.map(event => ({
                id:event.id,
                userId:userId,
                allDay:event.allDay,
                title:event.title,
                start: event.startTime,
                end: event.endTime, 
            }));
            console.log('event: '+JSON.stringify(event));
        }else{
            console.log(ERROR.SERVER_ERROR);
        }

    }catch(err){
        console.error(err);
        console.log(ERROR.SERVER_ERROR);
    }

    return (
        <>
        <div className="mt-5 lg:mt-10"/>
        <CalendarContainer userId={userId} event={event}/>
        </>
      );
    
}
