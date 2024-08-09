'use client';
import { SERVER_API } from "@/constants/enums/API";
import { PG } from "@/constants/enums/PG";
import { products } from "@/constants/payment/constant";
import { handlePayment } from "@/service/payment/actions";
import { I_ApiPaymentRequest, IamportResponse } from "@/types/TransactionData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        IMP: any;
    }
}
const PaymentContainer = () => {
    const [selectedOption, setSelectedOption] = useState<'option1' | 'option2' | 'option3'>('option1');
    const merchant_uid = new Date().getTime().toString();
    const router=useRouter();

    useEffect(() => {
        const jquery = document.createElement('script');
        jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
        const iamport = document.createElement('script');
        iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const requestPay = async (selectedOption: "option1" | "option2" | "option3") => {

        window.IMP.init(process.env.NEXT_PUBLIC_IAMPORT_API_KEY); // Iamport 가맹점 식별코드

        window.IMP.request_pay(
            {
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: merchant_uid, 
                name: products[selectedOption].name,
                amount: products[selectedOption].price, 
                buyer_name: '철수',
                buyer_tel: '010-4444-1111',
            },

            async (rsp: IamportResponse) => {
              
                try {
                    if (rsp.success) {
                        console.log('rsp.imp_uid: '+rsp.imp_uid);
                        const result=await handlePayment(rsp.imp_uid,rsp.paid_amount,products[selectedOption]);

                        if(result?.message==='SUCCESS'){
                            alert('상품 결제를 성공하셨습니다.');
                            router.push(`${PG.USER_INFO}`);
                        }
                        else{
                            alert('결제에 실패하셨습니다. 다시 시도해주세요.');
                            router.refresh();
                        }
                    } else {
                        alert('결제에 실패하셨습니다. 다시 시도해주세요.');
                        router.refresh();
                    }
                } catch (error) {
                    console.error('payment error: ', error);
                    alert('결제에 실패하셨습니다. 다시 시도해주세요.');
                }
            }
        );
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue as 'option1' | 'option2' | 'option3');
    }

    const handlePurchaseClick = async () => {

        const selectedProduct = products[selectedOption];

        if (!selectedProduct) {
            alert('상품을 선택해주세요.');
            return;
        } else {
            requestPay(selectedOption);
        }
    };

    return (<>
        <div>
            <div className="mt-3" />
            <select
                name="product"
                id="product"
                required
                className="form_input block"
                value={selectedOption}
                onChange={handleOptionChange}
            //disabled={pending}
            >
                <option
                    value="option1">1. 구독 10일 (100 포인트)</option>
                <option
                    value="option2">2. 구독 30일 (200 포인트)</option>
                <option
                    value="option3">3. 구독 60일 (500 포인트)</option>
            </select>
            <div className="w-full bg-slate-200 h-0.5 my-3" />
            <div className="flex flex-row justify-between my-2">
                <p className="text-slate-500 text-[15px]">총 결제금액</p>
                <p className="font-medium text-sm">{products[selectedOption].price}포인트</p>
            </div>

            <button
                type="button"
                onClick={handlePurchaseClick}
                className="form_submit_btn mt-3"
            >
                상품 구매하기
            </button>
        </div>

    </>);
}
export default PaymentContainer;