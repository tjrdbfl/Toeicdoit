import BoardLoading from "@/components/board/BoardLoading";
import CustomPagination from "@/components/common/CustomPagination";
import InquiryTable from "@/components/my-page/InquiryTable";
import { CommonHeader } from "@/config/headers";
import { PG } from "@/constants/enums/PG";
import { BoardData, I_ApiBoardRequest, I_ApiBoardResponse } from "@/types/BoardData";
import { ITEMS_PER_PAGE } from "@/types/ToeicData";
import { Suspense } from "react";

export const metadata = {
    title: "Toeicdoit - Inquiry Details Page",
    description: "",
};
const InquiryDetailsPage = async({ params }: {
    params: {
        page: string;
    }
}) => {

    const currentPage = Number(params.page) || 1;
    let totalPages: number = 0;
    let boards: BoardData[] = [];
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/${PG.FREE}?currentPage=${currentPage}&offset=${offset}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        });

        if(!response.ok){
            throw new Error('Failed to fetch inquiry-details');
        }
        const data:I_ApiBoardResponse=await response.json();

        if(data && data.success){
            boards=data.Boards;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data',data.message);
        }

    }catch(err){
        console.error('Failed to get response data',err);
    }
   

    return (<>
        <div className="flex flex-col gap-y-10">
            <h2 className="text-black text-4xl">문의 내역</h2>
            <Suspense key={currentPage} fallback={<><BoardLoading /></>}>
                <InquiryTable boards={boards} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <CustomPagination totalPages={totalPages} />
            </div>
        </div>
    </>);
}
export default InquiryDetailsPage;