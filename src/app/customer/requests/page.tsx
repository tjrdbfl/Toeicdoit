import BoardDetailTitle from "@/components/board/BoardDetailTitle";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import RequestForm from "@/templates/customer/RequestForm";

export default function RequestPage(){
        return(<div className="px-36 py-20">
                <div className="w-full flex flex-col lg:px-20 2xl:px-[30%]">
                    <div className="mt-5" />
                    <MyPageHeader label={"1:1 문의 하기"}/>
                    <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                        <RequestForm/>
                    </div>
            </div>
            );
} 