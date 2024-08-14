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
      <ScrollArea
        className={"overflow-y-auto flex flex-col rounded-lg h-[400px] w-full mt-2 mb-4 scroll-area p-2 shadow-md border-2 border-slate-100 justify-center items-center"}>
        {paymentResult.length === 0 ?
          <p className="text-blue-500 text-center mt-40">결제 내역이 없습니다.</p> :
          paymentResult.map((payment, index) => (
            <div
            key={index}>
              <UserPaymentCard key={index} paymentResult={payment} />
              <div className="bg-slate-200 h-0.5 w-full" />
            </div>

          ))}

      </ScrollArea>
    </>
  );
};
export default UserPaymentContainer;
