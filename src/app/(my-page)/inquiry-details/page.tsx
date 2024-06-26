import InquiryDetailsContainer from "@/templates/my-page/InquiryDetailsContainer";

const InquiryDetailsPage=()=>{
    return(<>
    <div className="flex flex-col gap-y-10 mt-[5%]">
    <h2 className="text-black text-4xl">1대1 문의</h2>
    <InquiryDetailsContainer/>
    <h2 className="text-black text-4xl">자유 게시판</h2>
    <InquiryDetailsContainer/>
    </div>
    </>);
}
export default InquiryDetailsPage;