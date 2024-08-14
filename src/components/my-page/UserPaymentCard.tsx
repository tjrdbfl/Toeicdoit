'use client';
import { ERROR } from "@/constants/enums/ERROR";
import { paymentRefund } from "@/service/payment/actions";
import { PaymentModel } from "@/types/TransactionData";
import Image from "next/image";

const UserPaymentCard=({ paymentResult }: {
        paymentResult: PaymentModel
    })=>{

        const handleRefund=async()=>{
            const response=await paymentRefund(paymentResult);
            
            if(response.status===200){
                alert('환불 성공하셨습니다.');
            }else{
                alert(ERROR.SERVER_ERROR);
            }
        }


        return(<>
        <div className="bg-white p-3 flex flex-row gap-x-5 items-center justify-between w-full">
                <div className="flex flex-row gap-x-2 lg:gap-x-5">
                <Image loading="lazy" 
                src={"/images/payment/payment.png"} 
                alt={"payment"}
                width={70}
                height={70}
                className="border-slate-200 border-2 object-fill w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"/>
        <div className="flex flex-col gap-y-1 lg:gap-y-2">
            <p className="text-[14px] lg:text-[16px]">{paymentResult.subscribeId===1?'1. 구독 10일 (100 포인트)':paymentResult.id===2?'2. 구독 30일 (200 포인트)':'3. 구독 60일 (500 포인트)'}</p>
            <p className=" text-[12px] lg:text-[12px]">{paymentResult.createdAt.toString().slice(0,10)+' '+paymentResult.createdAt.toString().slice(11,19)}</p>    
        </div>  
                </div>
               
        <p className={`text-[14px] lg:text-[16px] ${paymentResult.status==='OK' ? 'text-blue-500':'text-green-500'}`}>{paymentResult.status==='OK' ? '결제완료':paymentResult.status==='READY' ? '결제 중':'결제완료'}</p>
        <div className="w-[60px]">
        <button 
        type="button"
        className="form_submit_btn"
        onClick={handleRefund}
        >
            환불    
        </button>
        </div>
       
        </div>
        </>);
}
export default UserPaymentCard;