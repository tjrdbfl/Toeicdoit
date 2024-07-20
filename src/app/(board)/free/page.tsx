import Search from "@/components/common/Search";
import BoardLoading from "@/components/board/BoardLoading";
import BoardTable from "@/components/board/BoardTable";
import CustomPagination from "@/components/common/CustomPagination";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import { Suspense } from "react";
import WriteBtn from "@/components/button/WriteBtn";
import { CommonHeader } from "@/config/headers";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER_API } from "@/constants/enums/API";
import LinkIcon from "@/components/common/LinkIcon";


export const metadata = {
    title: "Toeicdoit - Free Page",
    description: "",
};
export default async function FreePage({searchParams}:{
    searchParams:{
        search:string;
        page:string;
    }
}){
    
    const search = searchParams?.search || '';
    const currentPage=Number(searchParams?.page)||1;
    let totalPages:number=0;
    let posts:BoardData[]=[];

    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-types?page=${currentPage-1}&type=자유&size=10`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-cache'
        })

        const data:I_ApiBoardResponse=await response.json();

        if(data){
            posts=data.content;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data'+ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log('Failed to get notice: ',ERROR.SERVER_ERROR);
    }

    return(<>
    <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[10%] xl:py-[10%] 2xl:py-[5%] total_padding">
        <div className="xl:px-32">
        <div className="flex flex-row items-center gap-x-2">
            <LinkIcon size={25}/>
            <h1 className="text-black font-medium text-start xl:text-2xl">자유게시판</h1>
            </div>
       
            <div className="mt-4 flex items-center md:mt-8 flex-wrap justify-between gap-y-5">
                <Search placeholder={"검색어를 입력해주세요."} />
                <WriteBtn/>
            </div>
            <Suspense key={search + currentPage} fallback={<><BoardLoading/></>}>
                <BoardTable boards={posts} type={'post'} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
               <CustomPagination type='double' totalPages={totalPages}/> 
            </div>      
        </div>
        </div>
    </>);
}