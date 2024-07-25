import { BoardData } from "@/types/BoardData";
import CalendarContainer from "@/templates/my-page/CalendarContainer";
import { cookies } from "next/headers";
import { CommonHeader } from "@/config/headers";
import { IEvent } from "@/types/TransactionData";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER_API } from "@/constants/enums/API";
import MainHeader from "@/components/common/MainHeader";
import LinkIcon from "@/components/common/LinkIcon";
import MyPageHeader from "@/components/common/MyPageHeader";

export interface I_ApiFreeSaveResponse{
    success:boolean;
    message?:string;
    board:BoardData;
}
export default function CalendarPage(){
    
    const cookieStore=cookies();
    //const userId=cookieStore.get('userId');

    const userId=1;
    console.log(JSON.stringify(userId));
    let event:IEvent[]=[];
    
    async function getCalenderInfoById(){
        'use server';
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
    
    }
  
    return (
        <>
        <div className="mt-5 lg:mt-10"/>
        <nav className="flex justify-between mb-3 border-b-2 border-violet-100 p-4">
        <MyPageHeader label={"Calendar"}/>
            </nav>

            <p className="px-10 text-[16px]">1. 일정 추가</p>
            <p className="px-10 text-[14px]"> - 다음 버튼들을 캘린더의 원하는 날짜로 드래그해서 일정을 추가해보세요!</p>
            <p className="px-10 text-[14px]"> - 캘린더에서 일정을 추가하고 싶은 날짜를 클릭해 보세요!</p>
            <p className="px-10 text-[16px] mt-2">2. 일정 삭제</p>
            <p className="px-10 text-[14px]"> - 해당 달력의 날짜를 클릭해 일정을 삭제해 보세요!</p>
            <p className="px-10 text-[16px] mt-2">3. 저장하기</p>
            <p className="px-10 text-[14px]"> - 저장하기 버튼을 눌러서 일정을 저장헤 보세요!</p>
        <CalendarContainer userId={userId} event={event}/>
        </>
      );
    
}
