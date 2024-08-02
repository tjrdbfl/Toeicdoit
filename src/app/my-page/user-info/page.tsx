
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { findUserInfoById } from "@/service/auth/actions";
import UserInfoContainer from "@/templates/my-page/UserInfoContainer";
import UserPaymentContainer from "@/templates/my-page/UserPaymentContainer";
import { PaymentModel } from "@/types/TransactionData";
import { UserDataPublic } from "@/types/UserData";
import { useQuery } from "@tanstack/react-query";

export default async function UserInfoPage(){


    let userInfo:UserDataPublic|undefined={
        email: "",
        phone: "",
        profile: "",
        name: "",
        toeicLevel: 0
    };
    let userInfoSuccess:boolean=false;
    let paymentInfo:PaymentModel[]=[];
    
    try{
        const response=await findUserInfoById();

        if(response?.status===200){
            userInfo=response.data;
            userInfoSuccess=true
        }else{
            userInfoSuccess=false;
        }

    }catch(err){
        userInfoSuccess=false;
    }
  
    async function getPaymentInfoById(){
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
    }


    return(<>
    <div className="flex flex-col mt-10 lg:mt-20">
    <UserInfoContainer userInfo={userInfo} userInfoSuccess={userInfoSuccess}/>
    <div className="mt-10 mb-5">
    <MyPageHeader label={"주문서"}/>
    </div>
    <UserPaymentContainer paymentResult={paymentInfo}/>
    </div>
    </>);
}

