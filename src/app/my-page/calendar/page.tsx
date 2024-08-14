import CalendarContainer from "@/templates/my-page/CalendarContainer";
import { cookies } from "next/headers";
import { IEvent } from "@/types/TransactionData";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER_API } from "@/constants/enums/API";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { getCalenderInfoById } from "@/service/calendar/actions";

export default async function CalendarPage(){
    
    const cookieStore=cookies();
    const userId=cookieStore.get('userId')?.value;

    //const userId=1;
    console.log(JSON.stringify(userId));
    let event:IEvent[]=[];
    
    try{
        const response=await getCalenderInfoById();
  
        if(response.status===200){
            event=response.data as IEvent[];
        }else{
            console.log(ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log(ERROR.SERVER_ERROR);
    }
    
    return (
        <>
        <div className="mt-5 lg:mt-16"/>
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
