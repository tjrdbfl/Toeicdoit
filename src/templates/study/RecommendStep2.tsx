import StudyHeader from "@/components/study/StudyHeader";
import Image from "next/image";

export default function RecommendStep2() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-wrap w-full justify-between">
          <div className="flex flex-col">
            <div className="text-black text-[14px] ml-2 mb-7">
              토익두잇 공부법 2
            </div>
            <div className=" w-full opacity-5 -z-5" />
            <div className="flex flex-row gap-x-5 items-end">
              <h1 className="text-3xl mb-2 text-[var(--blue1)]">Step 4.</h1>
              <h1 className="text-xl mb-2 font-medium">캘린더</h1>
            </div>

            <h1 className="mt-5 text-[14px]">
              똑똑한 캘린더로 토익 학습 완벽 관리!
            </h1>
            <p className="mt-2 mb-5 text-[12px] text-blue-500">
              ※ 마이페이지에서 확인하실 수 있는 상품입니다.
            </p>

            <StudyHeader label={"토익두잇 캘린더, 이렇게 활용하세요!"} />
            <div className="my-5 gap-y-2 flex flex-col">
              <p className="text-[15px] font-semibold">✅ 출석체크</p>
              <p className="text-[14px]">
                매일 꾸준히 공부하고 출석체크 해보세요!
              </p>
              <p className="text-[15px] font-semibold">🔔 구독관리</p>
              <p className="text-[14px]">내 구독 정보를 한눈에 확인해보세요!</p>
              <p className="text-[14px]">
                ( 결제일, 남은 기간 등 꼼꼼하게 체크할 수 있습니다. )
              </p>
              <p className="text-[15px] font-semibold">
                📝 나만의 학습 계획을 세우고 실천!
              </p>
              <p className="text-[14px]">
                원하는 날짜를 클릭하여 일정을 캘린더에 등록 토익 학습을
                체계적으로 관리해보세요!
              </p>
            </div>
          </div>
          <Image loading="lazy"
            src={"/images/recommend/step-calendar.png"}
            alt={"step-calendar"}
            width={600}
            height={500}
            className="p-1 w-[600px] h-[500px]rounded-xl border-slate-100 border-2 shadow-lg"
          />
        </div>

        <div className="flex flex-row gap-x-5 items-end mt-10">
          <h1 className="text-3xl mb-2 text-[var(--blue1)]">Step 5.</h1>
          <h1 className="text-xl mb-2 font-medium">채팅</h1>
        </div>
        <h1 className="mt-5 text-[14px]">나 혼자만의 토익은 이제 그만!</h1>
        <h1 className="mt-2 text-[14px]">
          지금 바로 채팅방에 참여하고, 혼자가 아닌 함께 토익을 정복해보세요!
        </h1>
        <div className="mt-5" />
        <StudyHeader label={"채팅방 참여"} />
        <div className="my-5 gap-y-2 flex flex-col">
          <p className="text-[15px] font-semibold">🤝 스터디 모집</p>
          <p className="text-[14px]">함께 공부할 파트너를 찾아 시너지 효과 UP!!</p>
          <p className="text-[15px] font-semibold">🎓 대학생</p>
          <p className="text-[14px]">졸업 전 토익 목표 달성! 선배들의 꿀팁 공유까지!</p>
          <p className="text-[15px] font-semibold">
          💼 취준생
          </p>
          <p className="text-[14px]">
          좁은 취업문, 토익으로 뚫어봐요! 정보 교환은 덤!
          </p>
          <p className="text-[15px] font-semibold">
          🚀 이직 준비
          </p>
          <p className="text-[14px]">
          커리어 전환의 필수템! 토익 고득점으로 이직 성공!
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-10 items-center">
          <Image loading="lazy"
            src={"/images/recommend/score-check.png"}
            alt={"score-check"}
            width={500}
            height={500}
            className="p-1 w-[300px] h-[450px] rounded-xl border-slate-100 border-2 shadow-lg"
          />
          <Image loading="lazy"
            src={"/images/recommend/score-check.png"}
            alt={"score-check"}
            width={500}
            height={500}
            className="p-1 w-[300px] h-[450px] rounded-xl border-slate-100 border-2 shadow-lg"
          />
          <Image loading="lazy"
            src={"/images/recommend/score-check.png"}
            alt={"score-check"}
            width={500}
            height={500}
            className="p-1 w-[300px] h-[450px] rounded-xl border-slate-100 border-2 shadow-lg"
          />
        </div>
    
      </div>
    </>
  );
}
