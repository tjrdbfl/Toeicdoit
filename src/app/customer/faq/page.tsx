import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import MainHeader from "@/components/common/MainHeader";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import CustomerFAQContainer from "@/templates/customer/CustomerFAQContainer";

export default function CustomerFAQPage() {
  return (
    <div className="px-20 py-20">
      <div className="w-full flex flex-col lg:px-20 2xl:px-[25%]">
        <div className="mt-5" />
        <MainHeader label={"고객센터 FAQ"} />
        <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
        <div className="px-5 py-3">
        <h1 className="text-[var(--blue1)] font-medium text-start text-xl">
          자주하는 질문
        </h1>
        <div className="mt-5"/>
        <CustomerFAQContainer/>
        </div>
       
      </div>
    </div>
  );
}
