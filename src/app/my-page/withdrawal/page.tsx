import MyPageHeader from "@/components/my-page/MyPageHeader";
import WithdrawalForm from "@/templates/my-page/WithdrawalForm";
import { cookies } from "next/headers";

export default function WithdrawalPage() {

  const name=cookies().get('name')?.value;
  const email=cookies().get('email')?.value;

  return (
    <div className="px-20 lg:px-52">
      <div className="mt-5 lg:mt-20" />
      <nav className="flex justify-between mb-3 border-b-2 border-violet-100 p-4">
        <MyPageHeader label={"회원탈퇴"} />
      </nav>
      <WithdrawalForm email={email===undefined?'':email} name={name===undefined?'':name}/>
    </div>
  );
}
