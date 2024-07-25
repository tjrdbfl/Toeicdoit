'use server';

import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { productsType } from "@/constants/payment/constant";
import { I_ApiPaymentRequest } from "@/types/TransactionData";
import { cookies } from "next/headers";

export async function handlePayment(imp_uid: string, paid_amount: number, product: productsType) {

    console.log(imp_uid);

    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')?.value;
    const userId = cookieStore.get('userId')?.value;

    if (userId === undefined) {
        return { message: ERROR.INVALID_MEMBER };
    }
    else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/verifyIamport/${imp_uid}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: 'no-store'
            });

        const result = await response.json();

        console.log('handlePayment: ' + result);

        if (paid_amount === result.amount) {
            console.log(result.response);

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

            const subscribeResult = await subscribeResponse.json();

            console.log('subscribeResult: ' + subscribeResult);

            if (subscribeResult.message === 'SUCCESS') {
                console.log('구독 변경 완료');

                const productData = {
                    userId: userId,
                    subscribeId: subscribeResult.subscribeId,
                    productId: product.id,
                    amount: product.price,
                    name: product.name,
                    subscribeDate: product.duration,
                    paymendUid: imp_uid,
                    createdAt: new Date(),
                    status: 'OK'
                }

                const paymentResponse = await fetch(``, {
                    method: 'POST',
                    headers: CommonHeader,
                    body: JSON.stringify(productData),
                    cache: 'no-store'
                });

                const paymentResult = await paymentResponse.json();
                console.log('상품 결제 전송 완료');

                if (paymentResult.message === 'SUCCESS') {
                    return { message: 'SUCCESS' }
                } else {
                    return { message: ERROR.SERVER_ERROR };
                }

            } else if (subscribeResult.message === 'FAILURE') {
                return { message: ERROR.SERVER_ERROR };
            }
        }
    }
}