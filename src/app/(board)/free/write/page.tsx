import FreeLink from "@/components/board/FreeLink";
import LinkIcon from "@/components/common/LinkIcon";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import FreeSaveForm from "@/templates/board/FreeSaveForm";

export default function FreeWritePage() {
  return (
    <>
      <div className="px-36 py-20">
        <div className="lg:px-[20%] mb-5">
        <FreeLink label={"글쓰기"} />
        </div>
        
        <div className="w-full flex flex-col lg:px-20 2xl:px-[30%]">
          <div className="mt-5" />
          <MyPageHeader label={"자유게시판"} />
          <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
          <FreeSaveForm />
        </div>
      </div>
     
    </>
  );
}
