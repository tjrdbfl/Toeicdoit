import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import CustomPagination from "@/components/common/CustomPagination";
import MainHeader from "@/components/common/MainHeader";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { CustomerFAQPart } from "@/constants/customer/constant";
import CustomerFAQContainer from "@/templates/customer/CustomerFAQContainer";

export default function CustomerFAQPage({
  searchParams
}:{searchParams:{page:number}}) {

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
        <p className="text-[12px] mt-4">문의하시기 전에 자주하는 질문을 이용하시면 고객님의 궁금증을 빠르게 해결하실 수 있습니다.</p>
        <div className="mt-5"/>
        <CustomerFAQContainer page={searchParams.page || 1}/>
        </div>
       
      </div>
    </div>
  );
}
