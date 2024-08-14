import { StudyRecipe1, StudyRecipe2 } from "@/constants/study/constants";

export default function StudyFAQRecipe2() {
  return (
    <>
    <h1 className="mt-10 text-lg font-semibold   text-[var(--blue1)]">🌐 무조건 많은 문제를 풀기 보다는, 버리는 스킬이 더 중요!</h1>
    <p className="text-black text-pretty text-[13px] mt-4">점수를 100점 이상 올리고 싶다면 하루 평균 70개를 풀어주세요.</p>
    <p className="text-black text-pretty text-[13px] mt-1">그리고 점진적으로 신규 문제를 줄이고 1일 1복습으로 실전력을 올려주세요.</p>
    
     <div className="bg-gradient-faq1 rounded-xl border-blue-100 border-2 py-10 px-5 lg:px-20 mt-5">
        <p className="font-semibold  text-center">
          목표 점수대별 추천 문제풀이 수
        </p>
        <div className="mt-10" />
        <div className="w-full rounded-t-lg text-black flex flex-row border-slate-100 border-b-2 gap-x-1 border-b-zinc-200 ">
          <p className="w-[50%] text-center font-semibold  text-[14px] p-2">파트</p>
          <p className="w-[50%] text-center font-semibold text-[14px] bg-gradient-faq2 p-2 rounded-t-lg border-zinc-200 border-2">
           600점대
          </p>
          <p className="w-[50%] text-center font-semibold text-[14px]  bg-gradient-faq2 p-2 rounded-t-lg border-zinc-200 border-2">
          700점대
          </p>
          <p className="w-[50%] text-center font-semibold text-[14px]  bg-gradient-faq2 p-2 rounded-t-lg border-zinc-200 border-2">
          800점대
          </p>
          <p className="w-[50%] text-center font-semibold text-[14px]  bg-gradient-faq2 p-2 rounded-t-lg border-zinc-200 border-2">
          900점대
          </p>
     
        </div>

        <div className="flex flex-col items-center justify-center w-full">
              {StudyRecipe2.map((item)=>(
                <div
                key={item.id}
                className={`flex flex-row w-full ${item.id===6 ? '':'border-b-zinc-200 border-b-2'} gap-x-1`}>
                <p className="w-[50%] font-semibold  text-center   text-[14px] py-2">
                  {item.part}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 2">
                  {item.col1}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 ">
                 {item.col2}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 ">
                 {item.col3}
                </p>
                <p className="w-[50%] bg-gradient-faq4 text-center font-semibold text-[14px] py-2 ">
                 {item.col4}
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
