import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import { I_ApiExamRequest, I_ApiExamResponse } from "@/app/api/exam/route";
import Search from "@/components/common/Search";
import ExamLoading from "@/components/exam/ExamLoading";
import ExamTable from "@/components/exam/ExamTable";
import CustomPagination from "@/components/common/CustomPagination";
import { Suspense } from "react";
import { CommonHeader } from "@/config/headers";

export default async function ExamPage({ searchParams }: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    let totalPages:number=0;

    const payload:I_ApiExamRequest={
        query:query
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/exam`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify(payload),
        });
    
        if(!response){
            console.error('Failed to get response');
        }
    
        const data:I_ApiExamResponse=await response.json();
    
        if(!data.success){
            console.error('Failed to fetch exam data: ',data.message);
        }
        
        totalPages=data.totalPages||0;
    }catch(error){
        console.log('Error fetching exam data: ',error);
    }
    

    return (<>
    <Navbar/>
    <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
      
        <div className="md:py-28 lg:py-28">
            <h1 className="text-black font-medium text-start text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">기출 모의고사</h1>
            <div className="mt-4 flex items-center md:mt-8">
                <Search placeholder={"검색어를 입력해주세요."} />
            </div>
            <Suspense key={query + currentPage} fallback={<><ExamLoading/></>}>
                <ExamTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
               <CustomPagination totalPages={totalPages}/> 
            </div>
          
        </div>
        </div>
        <Footer/>
    </>);
}
