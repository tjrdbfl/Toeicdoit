import Search from "@/components/common/Search";
import BoardLoading from "@/components/board/BoardLoading";
import BoardTable from "@/components/board/BoardTable";
import CustomPagination from "@/components/common/CustomPagination";
import { I_ApiBoardRequest, I_ApiBoardResponse, BoardDataPublic } from "@/types/BoardData";
import { ITEMS_PER_PAGE } from "@/types/ToeicData";
import { Suspense } from "react";
import WriteBtn from "@/components/button/WriteBtn";
import { CommonHeader } from "@/config/headers";

export const metadata = {
    title: "Toeicdoit - Post Page",
    description: "",
};
export default async function PostPage({searchParams}:{
    searchParams:{
        query:string;
        page:string;
    }
}){
    const query=searchParams?.query||'';
    const currentPage=Number(searchParams?.page)||0;
    let totalPages:number=0;
    let posts:BoardDataPublic[]=[];
    const offset=(currentPage-1)*ITEMS_PER_PAGE;

    const payload:I_ApiBoardRequest={
        query:query,
        currentPage:currentPage,
        offset:offset
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/getAll`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify(payload),
            cache:'no-store'
        })

        if(!response.ok){
            throw new Error('Failed to fetch post');
        }

        const data:I_ApiBoardResponse=await response.json();

        if(data && data.success){
            posts=data.Boards;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data',data.message);
        }

    }catch(err){
        console.log('Failed to get post: ',err);
    }

    return(<>
    <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
        <div className="">
            <h1 className="text-black font-medium text-start text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">자유게시판</h1>
            <div className="mt-4 flex items-center md:mt-8 flex-wrap justify-between gap-y-5">
                <Search placeholder={"검색어를 입력해주세요."} />
                <WriteBtn/>
            </div>
            <Suspense key={query + currentPage} fallback={<><BoardLoading/></>}>
                <BoardTable notices={posts} type={2} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
               <CustomPagination totalPages={totalPages}/> 
            </div>      
        </div>
        </div>
    </>);
}