import Search from "@/components/common/Search";
import BoardLoading from "@/components/board/BoardLoading";
import BoardTable from "@/components/board/BoardTable";
import CustomPagination from "@/components/common/CustomPagination";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import { Suspense } from "react";
import WriteBtn from "@/components/button/WriteBtn";
import { CommonHeader } from "@/config/headers";
import { ERROR } from "@/constants/enums/ERROR";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import MainHeader from "@/components/common/MainHeader";


export const metadata = {
    title: "Toeicdoit - Free Page",
    description: "토익두잇 자유게시판에서 다양한 주제에 대한 생각과 정보를 자유롭게 공유하고 소통하세요.",
};
export default async function FreePage({searchParams}:{
    searchParams:{
        search:string;
        page:string;
    }
}){
    
    const search = searchParams?.search || '';
    const currentPage = Number(searchParams?.page) || 1;
    let totalPages: number = 0;
    let posts: BoardData[] = [];
    let totalElements:number=0;

    console.log('searchParams: '+search);
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/public/${SERVER_API.BOARD}/findBy?title=${search}&type=free&page=${currentPage - 1}&size=10`, {
            method: 'GET',
            headers: CommonHeader,
            cache:'no-store'
        });
        
        const data: I_ApiBoardResponse = await response.json();

        if (data) {
            posts = data.content;
            totalPages = data.totalPages;
            totalElements=data.totalElements;
        } else {
            console.error('Failed to get response data by find-by-types' + ERROR.SERVER_ERROR);
        }


    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }

    return(<>
    <div className="w-full flex flex-col py-28 lg:py-[10%] xl:py-[10%] 2xl:py-[5%] px-20 xl:px-[10%]">
        <div className="xl:px-40">
        <MainHeader label={"자유게시판"}/>
       
       
            <div className="mt-4 flex items-center md:mt-8 flex-wrap justify-between gap-y-5">
                <Search placeholder={"검색어를 입력해주세요."} />
                <WriteBtn/>
            </div>
            <Suspense key={search + currentPage} fallback={<><BoardLoading/></>}>
                <BoardTable boards={posts} type={'free'} totalElements={totalElements} page={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
               <CustomPagination type='double' totalPages={totalPages} page={currentPage}/> 
            </div>      
        </div>
        </div>
    </>);
}