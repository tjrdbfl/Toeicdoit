'use client';

import { PG } from "@/constants/enums/PG";
import { ReplyData } from "@/types/BoardData";
import { useRouter } from "next/navigation";

const UserReplyContainer = ({ replyResult }: {
  replyResult: ReplyData[]
}) => {

  const router=useRouter();

  return (<>
    <div className="mt-5" />
    <div
      className="w-full rounded-t-lg py-2 text-black flex flex-row border-slate-100 border-2 pr-20 shadow-md"
    >
      <p className="w-[15%] text-center font-medium text-[14px]">번호</p>
      <p className="w-[70%] text-start font-medium text-[14px]">자유게시글 제목</p>
      <p className="w-[10%] text-start font-medium text-[14px]">작성날짜</p>
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
        {replyResult.length === 0 ?
          <tbody className="flex flex-row items-center justify-center h-[50px]">
            <p className="text-blue-500 font-medium">댓글 기록이 없습니다.</p>
          </tbody>
          :
          <tbody
            className=""
          >
            {replyResult.map((item, index) => (
              <tr
                key={item.id} className={`border-b-slate-200  border-b-2 hover:bg-blue-50`}
                onClick={()=>router.push(`${PG.INQUIRY_DETAILS}/modify/reply/${item.boardId}`)}
                >
                <td className="w-[15%] text-center font-medium text-[14px] py-3">{replyResult.length - index}</td>
                <td className="w-[70%] text-start font-medium text-[14px] py-3">{item.boardId}</td>
                <td className="w-[20%] text-start text-blue-500 text-[14px] font-semibold py-3">{new Date(item.updatedAt).toISOString().slice(0, 10)}</td>
              </tr>
            ))}

          </tbody>
        }

      </table>
    </div>
  </>);
}
export default UserReplyContainer;