import BoardLoading from "@/components/board/BoardLoading";
import InquiryTable from "@/components/my-page/InquiryTable";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { AuthorizeHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { findAllReplyByUserId } from "@/service/board/actions";
import UserReplyContainer from "@/templates/my-page/UserReplyContainer";
import { ReplyData } from "@/types/BoardData";
import { Suspense } from "react";


export default async function InquiryDetailsPage({ searchParams }: {
    searchParams: {
        page: string;
    }
}){

    let reply:ReplyData[]=[];

    const currentPage = Number(searchParams?.page) || 1;

    const response=await findAllReplyByUserId();

    if(response.status===200){
        reply=response.data||[];
    }

    console.log('current: '+currentPage);
    return (<>
        <div className="flex flex-col mt-10 lg:mt-20">
            <MyPageHeader label={"게시글 및 문의내역"}/>
            <div className="mt-5"/>
            <Suspense key={currentPage} fallback={<><BoardLoading /></>}>
                <InquiryTable page={currentPage} />
            </Suspense>
            
            <div className="mt-10"/>
            <MyPageHeader label={"댓글 관리"}/>
            <div className="mt-5"/>
            <UserReplyContainer replyResult={reply}  />
        
        </div>
    </>);
}
