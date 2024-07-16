import Search from "@/components/common/Search";
import CustomPagination from "@/components/common/CustomPagination";
import { Suspense } from "react";
import { CommonHeader } from "@/config/headers";
import BoardLoading from "@/components/board/BoardLoading";
import BoardTable from "@/components/board/BoardTable";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { redirect } from "next/navigation";
import { PG } from "@/constants/enums/PG";

export const metadata = {
    title: "Toeicdoit - Notice Page",
    description: "",
};
  
export default async function NoticePage({searchParams}:{
    searchParams?:{
        search?: string;
        page:string;
    }
}){
    const search = searchParams?.search || '';
    const currentPage=Number(searchParams?.page)||1;
    let totalPages:number=0;
    let notices:BoardData[]=[];

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-types?page=${currentPage-1}&type=공지&size=10&search=${'ddd'}`,{
            method:'GET',
            headers:CommonHeader,
            next:{revalidate:60*60}  //1시간
        })

        const data:I_ApiBoardResponse=await response.json();

        if(data){
            notices=data.content;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data'+ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log('Failed to get notice: ',ERROR.SERVER_ERROR);
    }

    return(<>
    <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
        <div className="">
            <h1 className="text-black font-medium text-start text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">공지사항</h1>
            <div className="mt-4 flex items-center md:mt-8">
                <Search placeholder={"검색어를 입력해주세요."} />
            </div>
            <Suspense key={search + currentPage} fallback={<><BoardLoading/></>}>
                <BoardTable boards={notices} type={"notice"} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
               <CustomPagination type='double' totalPages={totalPages}/> 
            </div>      
        </div>
        </div>
    </>);
}