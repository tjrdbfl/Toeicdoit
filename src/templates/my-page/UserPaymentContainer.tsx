"use server";

import UserPaymentCard from "@/components/my-page/UserPaymentCard";
import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";
import {
  MyPageResult,
  MyPageResultContent,
} from "@/constants/my-page/datagrid";
import { PaymentModel } from "@/types/TransactionData";
import { useEffect, useState } from "react";

const UserPaymentContainer = ({
  paymentResult,
}: {
  paymentResult: PaymentModel[];
}) => {
  return (
    <>
      <div 
       className="overflow-y-auto rounded-lg h-[400px] mt-2 mb-4 scroll-area p-2 shadow-md border-2 border-slate-100 flex justify-center items-center">  
        {paymentResult.length===0?
        <p className="text-blue-500">결제 내역이 없습니다.</p>:
        paymentResult.map((payment, index) => (
            <>
             <UserPaymentCard key={index} paymentResult={payment} />
            <div className="bg-slate-200 h-0.5 "/>
            </>
         
        ))}

      </div>
    </>
  );
};
export default UserPaymentContainer;
