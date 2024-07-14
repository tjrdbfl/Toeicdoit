import BoardLoading from "@/components/board/BoardLoading";
import CustomPagination from "@/components/common/CustomPagination";
import LinkIcon from "@/components/common/LinkIcon";
import InquiryTable from "@/components/my-page/InquiryTable";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
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
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.BOARD}/find-types?page=${currentPage-1}&type=공지&size=10`,{
            method:'GET',
            headers:CommonHeader,
            next:{revalidate:60*60}
        })

        const data:I_ApiBoardResponse=await response.json();

        if(data){
            boards=data.content;
            totalPages=data.totalPages;
        }else{
            console.error('Failed to get response data'+ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log('Failed to get notice: ',ERROR.SERVER_ERROR);
    }


    return (<>
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-row gap-x-2 items-center mt-10 lg:mt-0">
            <LinkIcon size={30}/>
            <h2 className="text-black text-3xl">문의 내역</h2>
            </div>
            <Suspense key={currentPage} fallback={<><BoardLoading /></>}>
                <InquiryTable boards={boards} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <CustomPagination type='double' totalPages={totalPages} />
            </div>
        </div>
    </>);
}
export default InquiryDetailsPage;