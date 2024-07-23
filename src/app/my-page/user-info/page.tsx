'use server';
import MainHeader from "@/components/common/MainHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";
import UserPaymentContainer from "@/templates/my-page/UserPaymentContainer";
import { PaymentModel } from "@/types/TransactionData";
import { UserDataPublic } from "@/types/UserData";

export default async function UserInfoPage(){

    let userInfo:UserDataPublic={
        id: 0,
        email: "",
        phone: "",
        profile: "",
        name: "",
        toeicLevel: 0
    };

    let paymentInfo:PaymentModel[]=[];
    
    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.USER}/detail?id=${1}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        })

        const result:UserDataPublic=await response.json();

        if(result){
            userInfo=result;
        }else{
            console.log(ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log(ERROR.SERVER_ERROR);
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.PAYMENT}/find?id=${1}`,{
            method:'GET',
            headers:CommonHeader,
            cache:'no-store'
        })

        const result:PaymentModel[]=await response.json();

        console.log('payment result: ',JSON.stringify(result));
        if(result){
            paymentInfo=result;
        }else{
            console.log('payment result: ',ERROR.SERVER_ERROR);
        }
    }catch(err){
        console.log('payment result: ',ERROR.SERVER_ERROR);
    }



    return(<>
    <div className="flex flex-col lg:mt-20">
    <UserInfoContainer userInfo={userInfo}/>
    <div className="mt-10 mb-5">
    <MainHeader label={"주문서"}/>
    </div>
    <UserPaymentContainer paymentResult={paymentInfo}/>
    </div>
    </>);
}

