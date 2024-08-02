import MyPageHeader from "@/components/my-page/MyPageHeader";
import WithdrawalForm from "@/templates/my-page/WithdrawalForm";

export default function WithdrawalPage() {

  return (
    <div className="px-20 lg:px-52">
      <div className="mt-5 lg:mt-20" />
      <nav className="flex justify-between mb-3 border-b-2 border-violet-100 p-4">
        <MyPageHeader label={"회원탈퇴"} />
      </nav>
      <WithdrawalForm/>
    </div>
  );
}
