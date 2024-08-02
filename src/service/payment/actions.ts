'use server';

import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { productsType } from "@/constants/payment/constant";
import { MessageData } from "@/types/MessengerData";
import { I_ApiPaymentRequest, PaymentModel } from "@/types/TransactionData";
import { duration } from "@mui/material";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getPaymentInfoById(){
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/find-all-by-userId?id=${1}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        })

        const result:MessageData=await response.json();

        //console.log('payment result: ',JSON.stringify(result));
        
        if(result.state){
            return {status:200,data:result.data};
        }else{
            return {status:500};    
        }
    }catch(err){
        return {status:500};
    }
}

export async function handlePayment(imp_uid: string, paid_amount: number, product: productsType) {

    console.log(imp_uid);

    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')?.value;
    //const userId = cookieStore.get('userId')?.value;
    const userId=1;
    
    if (userId === undefined) {
        return { message: ERROR.INVALID_MEMBER };
    }
    else {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/verifyIamport`,
        //     {
        //         method: 'POST',
        //         headers: CommonHeader,
        //         cache: 'no-store'
        //     });

        // const result = await response.json();

        // console.log('handlePayment: ' + JSON.stringify(result));
        // console.log('handlePayment: ' + paid_amount);
        // console.log('handlePayment: ' +  result.amount);

        //if (paid_amount === result.amount) {
        if(true){
            //console.log(result.response);

            const subscribeDate: I_ApiPaymentRequest = {
                userId: Number(userId),
                productId: product.id,
                createdAt: new Date(),
                endDate: new Date(new Date().getTime() + product.duration * 24 * 60 * 60 * 1000)
            }

            const subscribeResponse = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.SUBSCRIBE}/save`, {
                method: 'POST',
                headers: CommonHeader,
                body: JSON.stringify(subscribeDate),
                cache: 'no-store'
            });
            
            const subscribeResult:MessageData = await subscribeResponse.json();

            //console.log('subscribeResult: ' + JSON.stringify(subscribeResult));

            if (subscribeResult.state) {
                console.log('구독 변경 완료');

                const productData = {
                    userId: userId,
                    subscribeId: subscribeResult.data,
                    productId: product.id,
                    amount: product.price,
                    paymentUid: imp_uid,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    duration:product.duration,
                    status: 'OK'
                }

                const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/save`, {
                    method: 'POST',
                    headers: CommonHeader,
                    body: JSON.stringify(productData),
                    cache: 'no-store'
                });

                const paymentResult:MessageData = await paymentResponse.json();
                //console.log('상품 결제 전송 완료: '+JSON.stringify(paymentResult));

                if (paymentResult.state) {
                    return { message: 'SUCCESS' };
                } else {
                    return { message: ERROR.SERVER_ERROR };
                }

            } else if (subscribeResult.message === 'FAILURE') {
                return { message: ERROR.SERVER_ERROR };
            }
        }
    }
}

export async function paymentRefund( paymentResult: PaymentModel){
    const userId=1;
    console.log('paymentRefund: '+JSON.stringify(paymentResult));
    try{

        const response=await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/refund`,{
            method:'POST',
            headers:CommonHeader,
            body:JSON.stringify(paymentResult)
            ,cache:'no-store'
        });

        const result:MessageData=await response.json();
        console.log('paymentRefund: '+JSON.stringify(result));
    
        if (result.state) {
            revalidatePath(`${PG.USER_INFO}`);

            return {status:200};
        } else {
            return {status:500};
        }
    }catch(err){
        return {status:500};
    }
}