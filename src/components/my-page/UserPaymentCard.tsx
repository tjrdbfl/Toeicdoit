import { PaymentModel } from "@/types/TransactionData";
import Image from "next/image";

const UserPaymentCard=({ paymentResult }: {
        paymentResult: PaymentModel
    })=>{
        return(<>
        <div className="bg-white p-3 flex flex-row gap-x-5 items-center justify-between">
                <div className="flex flex-row gap-x-2 lg:gap-x-5">
                <Image 
                src={"/images/payment/payment.png"} 
                alt={"payment"}
                width={70}
                height={70}
                className="border-slate-200 border-2 object-fill w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"/>
        <div className="flex flex-col gap-y-1 lg:gap-y-2">
            <p className="text-[13px] lg:text-[16px]">123112131321321321321{paymentResult.id}</p>
            <p className=" text-[10px] lg:text-[12px]">ddddddddd</p>    
        </div>  
                </div>
               
        <p className="text-[13px] lg:text-[16px]">{paymentResult.status==='OK' ? '결제완료':paymentResult.status==='READY' ? '결제 중':'결제완료'}</p>
        <div className="w-[60px]">
        <button className="form_submit_btn">
            환불    
        </button>
        </div>
       
        </div>
        </>);
}
export default UserPaymentCard;