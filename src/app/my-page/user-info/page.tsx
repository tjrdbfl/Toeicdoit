
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { findUserInfoById } from "@/service/auth/actions";
import { getSubscribeInfo } from "@/service/calendar/actions";
import { getPaymentInfoById } from "@/service/payment/actions";
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";
import UserPaymentContainer from "@/templates/my-page/UserPaymentContainer";
import { PaymentModel } from "@/types/TransactionData";
import { UserDataPublic } from "@/types/UserData";
import { revalidatePath } from "next/cache";

export default async function UserInfoPage() {

    revalidatePath(`${PG.USER_INFO}`);
        
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

    let subscribe:boolean=false;

    try {
        const response = await findUserInfoById();

        console.log('findUserInfoById: '+JSON.stringify(response));
        if (response?.status === 200) {
            userInfo = response.data;
            userInfoSuccess = true
        } else {
            userInfoSuccess = false;
        }

        console.log(JSON.stringify(response?.data));
    } catch (err) {
        userInfoSuccess = false;
    }

    try{
        const response = await getSubscribeInfo();

        console.log('getSubscribeInfo: '+JSON.stringify(response));
        if (response?.message==='SUCCESS') {
            subscribe=response.data===undefined? false:response.data;
            revalidatePath(`${PG.USER_INFO}`);
     
        } else {
            console.log(ERROR.SERVER_ERROR);
        }

    }catch(err){
        console.log('subscribe: ' + err);
    }

    try {
        const response = await getPaymentInfoById();

        if (response?.status === 200) {
            paymentInfo = response.data as PaymentModel[];
        } else {
            console.log(ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('payment: ' + err);
    }

    return (<>
        <div className="flex flex-col mt-10 lg:mt-20">
            <UserInfoContainer userInfo={userInfo} subscribe={subscribe}/>
            <div className="mt-10 mb-5">
                <MyPageHeader label={"주문서"} />
            </div>
            <UserPaymentContainer paymentResult={paymentInfo} />
        </div>
    </>);
}

