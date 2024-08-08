
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { findUserInfoById } from "@/service/auth/actions";
import { getPaymentInfoById } from "@/service/payment/actions";
import { getUserInfoInCookie } from "@/service/utils/token";
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";
import UserPaymentContainer from "@/templates/my-page/UserPaymentContainer";
import { PaymentModel } from "@/types/TransactionData";
import { UserDataPublic } from "@/types/UserData";
import { useQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";

export default async function UserInfoPage() {


    let userInfo: UserDataPublic | undefined = {
        email: "",
        phone: "",
        profile: "",
        name: "",
        toeicLevel: 0
    };
    let userInfoSuccess: boolean = false;
    let paymentInfo: PaymentModel[] = [     
        {
            id: 0,
            amount: 0,
            status: "OK",
            paymentUid: "",
            userId: 0,
            productId: 0,
            subscribeId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    try {
        const response = await findUserInfoById();

        if (response?.status === 200) {
            userInfo = response.data;
            userInfoSuccess = true
        } else {
            userInfoSuccess = false;
        }

    } catch (err) {
        userInfoSuccess = false;
    }

    try {
        const response = await getPaymentInfoById();

        if (response?.status === 200) {
            paymentInfo = response.data as PaymentModel[];
            revalidatePath(`${PG.USER_INFO}`);
        } else {
            console.log(ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('payment: ' + err);
    }

    return (<>
        <div className="flex flex-col mt-10 lg:mt-20">
            <UserInfoContainer userInfo={userInfo} userInfoSuccess={userInfoSuccess} />
            <div className="mt-10 mb-5">
                <MyPageHeader label={"주문서"} />
            </div>
            <UserPaymentContainer paymentResult={paymentInfo} />
        </div>
    </>);
}

