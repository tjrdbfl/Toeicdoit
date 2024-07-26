import BoardLoading from "@/components/board/BoardLoading";
import CustomPagination from "@/components/common/CustomPagination";
import InquiryTable from "@/components/my-page/InquiryTable";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import { Suspense } from "react";

export const metadata = {
    title: "Toeicdoit - Inquiry Details Page",
    description: "",
};
export default async function conInquiryDetailsPage({ params }: {
    params: {
        page: string;
    }
}){

    const currentPage = Number(params.page) || 1;
    let totalPages: number = 0;
    let boards: BoardData[] = [];
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-userId?id=10`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        })

        const data=await response.json();

        if(data){
            boards=data;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data'+ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log('Failed to get notice: ',ERROR.SERVER_ERROR);
    }


    return (<>
        <div className="flex flex-col gap-y-10 mt-10 lg:mt-20">
            <MyPageHeader label={"문의내역"}/>
            <Suspense key={currentPage} fallback={<><BoardLoading /></>}>
                <InquiryTable boards={boards} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <CustomPagination type='double' totalPages={totalPages} />
            </div>
        </div>
    </>);
}
