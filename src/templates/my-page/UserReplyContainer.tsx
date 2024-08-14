import InquiryBody from "@/components/my-page/InquiryBody";
import { ReplyData } from "@/types/BoardData";

const UserReplyContainer = async({ replyResult }: {
  replyResult: ReplyData[]
}) => {

  return (<>
    <div className="mt-5" />
    <div
      className="w-full rounded-t-lg py-2 text-black flex flex-row border-slate-100 border-2 pr-20 shadow-md"
    >
      <p className="w-[15%] text-center font-medium text-[14px]">번호</p>
      <p className="w-[40%] text-start font-medium text-[14px]">자유게시글 제목</p>
      <p className="w-[40%] text-start font-medium text-[14px]">댓글 내용</p>
      <p className="w-[15%] text-start font-medium text-[14px]">작성날짜</p>
    </div>

    <div
      className="overflow-y-auto w-full rounded-b-lg h-[400px] scroll-area shadow-md border-2 border-slate-100 flex justify-center items-start">
      <table
        className="hidden text-gray-900 md:table w-full ">
        <thead
          className="sticky top-0 z-10"
        >
          <tr className="bg-white text-black ">

          </tr>
        </thead>
        <tbody className="flex flex-col items-center justify-center w-full">
          {replyResult.length === 0 ?
            <tr className="text-blue-500 font-medium w-full flex justify-center items-center mt-40">
              <td>댓글 기록이 없습니다.</td>
              </tr>
            : replyResult.map((item, index) => (
              <InquiryBody
              key={index}
              id={item.id}
              boardId={item.boardId} 
              >
               <td className="w-[15%] text-center  font-medium text-[14px] py-3">{replyResult.length - index}</td>
                  <td className="w-[40%]  text-start font-medium text-[14px] py-3">{item.boardTitle}</td>
                  <td className="w-[40%]  text-start font-medium text-[14px] py-3">{item.content.slice(0, 16) + '...'}</td>
                  <td className="w-[15%] text-start text-blue-500 text-[14px] font-semibold py-3">{new Date(item.updatedAt).toISOString().slice(0, 10)}</td>
              </InquiryBody>
            ))}
            </tbody>

      </table>
    </div>
  </>);
}
export default UserReplyContainer;