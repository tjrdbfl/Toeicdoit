import InquiryDetailsContainer from "@/templates/my-page/InquiryDetailsContainer";

export const metadata = {
    title: "Toeicdoit - Inquiry Details Page",
    description: "",
};
const InquiryDetailsPage=()=>{
    return(<>
    <div className="flex flex-col gap-y-10 mt-[5%]">
    <h2 className="text-black text-4xl">문의 내역</h2>
    
    <InquiryDetailsContainer/>
    <h2 className="text-black text-4xl">자유 게시판</h2>
    <InquiryDetailsContainer/>
    </div>
    </>);
}
export default InquiryDetailsPage;