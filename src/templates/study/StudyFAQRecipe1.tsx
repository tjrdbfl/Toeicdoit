import { StudyRecipe1 } from "@/constants/study/constants";

export default function StudyFAQRecipe1() {
  return (
    <>
     <h1 className="mt-10 text-lg font-semibold text-[var(--blue1)]">🌐 100점 이상 점수 상승한 유저들의 학습 패턴</h1>
     <p className="text-black text-pretty text-[13px] my-4">100점 이상 점수 상수자들은 약 500개의 문제를 풀었고, 어려운 파트를 집중 학습하며 실전 스킬을 높였습니다.</p>
    
     <div className="w-full bg-gradient-faq1 rounded-xl border-blue-100 border-2 py-10 px-5 lg:px-20 mt-5 ">
        <p className="font-semibold text-center">
          점수 상승자 vs 미상승자들의 선택학습 문제풀이 분량
        </p>
        <div className="mt-10" />
        <div className="w-full  text-black flex flex-row border-slate-100 border-b-2 gap-x-1 border-b-zinc-200 ">
          <p className="w-[50%] text-center font-semibold text-[14px] p-2">파트</p>
          <p className="w-[50%] text-center font-semibold text-[14px] bg-gradient-faq2 p-2  border-zinc-200 border-2">
           미상승
          </p>
          <p className="w-[50%] text-center font-semibold text-[14px]  bg-gradient-faq2 p-2  border-zinc-200 border-2">
            100점 미만 상승
          </p>
          <p className="w-[50%] text-center font-semibold text-[14px]  bg-gradient-faq3 p-2  border-zinc-200 border-2">100점 이상 상승</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
              {StudyRecipe1.map((item)=>(
                <div
                key={item.id}
                className={`flex flex-row w-full ${item.id===6 ? '':'border-b-zinc-200 border-b-2'} gap-x-1`}>
                <p className="w-[50%] font-semibold text-center   text-[14px] py-2">
                  {item.part}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 2">
                  {item.col1}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 ">
                 {item.col2}
                </p>
                <p className="w-[50%] bg-gradient-faq5 text-center text-blue-500 text-[14px] font-semibold py-2 ">
                  {item.col3}
                </p>
              </div>
             
              ))}
              
            </div>
      </div>

      <div className="mt-5 flex flex-col gap-y-1">
        <p className="text-[12px]">점수 상승자 기준</p>
        <p className="text-[12px]">
          1. 최초 구매 기준, 이용 기간 내 최고 점수 기준
        </p>
        <p className="text-[12px]">
          2. 당사 서비스 성적, 당사 AI 서비스로 평가된 점수 기준, 토익 기준
        </p>
        <p className="text-[12px]">3. Part 7 의 경우 지문의 개수 기준입니다.</p>
      </div>
    </>
  );
}
