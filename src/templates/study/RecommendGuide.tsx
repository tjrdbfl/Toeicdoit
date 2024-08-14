import Image from "next/image";

export default function RecommendGuide() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <div className="text-black text-[14px] mb-7 ml-2">
              토익두잇으로 인해 바뀌는 공부법
            </div>
            <h1 className="text-[30px] mb-2">토익 두잇과 함께 저렴한 비용으로</h1>
            <h1 className="text-[30px]">고득점을 노려보세요!</h1>
            <h2 className="mt-10 ">
              토익 정복의 모든 것, 단 하나의 웹 사이트에서
              <br />
              지금 바로 시작하고 토익 목표 점수 달성하세요!
            </h2>
          </div>
          <Image loading="lazy"
            src={"/images/dashboard/feature-main.png"}
            alt={"feature-main"}
            width={500}
            height={500}
            className="w-[400px] h-[300px]"
          />
        </div>

        <div className="mt-10 lg:mt-5 flex flex-wrap justify-between w-full gap-10">
          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">🎯 실전 감각 UP! 토익 실전 모의고사</p>
            <p className="text-[14px]">
              실제 시험과 동일한 환경에서 완벽 대비!
            </p>
            <Image loading="lazy"
              src={"/images/dashboard/main-exam.png"}
              alt={"main-exam"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">📚 약점 극복! 파트별/레벨별 연습문제</p>
            <p className="text-[14px]">취약한 부분 집중 공략으로 점수 향상!</p>
            <Image loading="lazy"
              src={"/images/dashboard/level-practice.png"}
              alt={"level-practice"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">📈 맞춤 학습! 레벨 테스트</p>
            <p className="text-[14px]">
              내 실력을 정확히 파악하고 최적의 학습 전략 수립!
            </p>
            <Image loading="lazy"
              src={"/images/dashboard/level-test.png"}
              alt={"level-test"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">📅 나만의 캘린더로 토익 정복!</p>
            <p className="text-[14px]">
              출석체크, 구독 관리, 학습 일정까지 한눈에!
            </p>
            <Image loading="lazy"
              src={"/images/recommend/calendar.png"}
              alt={"calendar"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">📊 내 토익 실력, 한눈에 확인!</p>
            <p className="text-[14px]">
              개인별 맞춤형 차트 분석으로 정확한 토익 레벨 진단!
            </p>
            <Image loading="lazy"
              src={"/images/recommend/score.png"}
              alt={"score"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="font-semibold">💬 질문 해결! 실시간 채팅</p>
            <p className="text-[14px]">
              궁금증은 바로바로 해결! 전문가와 함께 토익 마스터!
            </p>
            <Image loading="lazy"
              src={"/images/recommend/chat.png"}
              alt={"chat"}
              width={500}
              height={500}
              className="w-[300px] h-[200px]  rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
