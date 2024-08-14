import StudyHeader from "@/components/study/StudyHeader";
import Image from "next/image";

export default function RecommendStep1() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <div className="text-black text-[14px] ml-2">토익두잇 공부법 1</div>
            <div className="gradient-01 w-full opacity-50 -z-5" />
            <div className="flex flex-row gap-x-5 items-end">
              <h1 className="text-3xl mb-2 text-[var(--blue1)]">Step 1.</h1>
              <h1 className="text-xl mb-2 font-medium">레벨테스트</h1>
            </div>

            <p className="my-5 text-[14px]">
              학습 하기 전 토익두잇 레벨테스트를 통해 정확한 레벨 진단으로
              나에게 딱 맞는 학습 전략을 세워보세요.{" "}
            </p>

            <StudyHeader label={"토익 두잇 레벨테스트"} />
            <div className="my-5 gap-y-2 flex flex-col">
              <p className="text-[14px]">
                1. 토익두잇 레벨테스트는 약 10분간 이루어집니다.
              </p>
              <p className="text-[14px]">
                2. 20문제의 다양한 유형의 문제를 풀어보며 자신의 취약점을
                분석합니다.
              </p>
              <p className="text-[14px]">
                3. 토익두잇 레벨테스트 결과를 바탕으로 수준별 학습을
                진행해보세요.
              </p>
              <p className="text-[14px]">
                4. 지속적인 레벨테스트로 꾸준히 레벨을 높여 목표 달성의 기쁨을
                누리세요!
              </p>
              <p className="text-[12px] text-blue-500">
                ※ 레벨테스트는 무료로 학습하실 수 있습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-10 items-center">
              <Image loading="lazy"
                src={"/images/recommend/level-test-start.png"}
                alt={"level-test-start"}
                width={500}
                height={500}
                className="p-2 w-[450px] h-[280px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/level-test.png"}
                alt={"level-test"}
                width={500}
                height={500}
                className="p-2 w-[500px] h-[280px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/recommend/level-test-result.png"}
                alt={"level-test-result"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[250px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
            </div>

            <div className="flex flex-row gap-x-5 items-end mt-20">
              <h1 className="text-3xl mb-2 text-[var(--blue1)]">Step 2.</h1>
              <h1 className="text-xl mb-2 font-medium">
                실전 모의고사, 파트별, 수준별 연습문제
              </h1>
            </div>

            <h1 className="mt-5 text-[14px]">
              실전 모의고사로 실전 감각을 익히고, 파트별/레벨별 연습문제로
              약점을 완벽하게 보완하세요.{" "}
            </h1>
            <p className="mt-2 text-[12px] text-blue-500">
              ※ 실전 모의고사, 파트별/레벨별 연습문제는 유료 학습 상품입니다.
            </p>
            <div className="mt-5" />
            <StudyHeader label={"토익 두잇 실전 모의고사"} />
            <div className="my-5 gap-y-2 flex flex-col">
              <p className="text-[14px]">
                1. 토익두잇 실전 모의고사는 실제 시험과 동일한 시간 제한으로
                2시간 동안 이루어집니다.
              </p>
              <p className="text-[14px]">
                2. OMR 답안 마킹을 통해 실전 감각을 극대화 해보세요.
              </p>
              <p className="text-[14px]">
                3. 체점 결과를 한눈에 보여주는 차트 분석으로 취약점을 완벽히
                파악해보세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-10 items-center">
              <Image loading="lazy"
                src={"/images/recommend/level-test-start.png"}
                alt={"level-test-start"}
                width={500}
                height={500}
                className="w-[450px] h-[280px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
             <Image loading="lazy"
                src={"/images/dashboard/main-exam.png"}
                alt={"main-exam"}
                width={500}
                height={500}
                className="w-[450px] h-[300px] p-2 rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/result.png"}
                alt={"result"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[250px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
            </div>

            <div className="mt-10" />
            <StudyHeader label={"수준별 연습문제"} />
            <div className="my-5 gap-y-2 flex flex-col">
              <p className="text-[14px]">
                1. 토익두잇 수준별 연습문제는 레벨테스트 결과를 바탕으로 측정한
                레벨에 맞는 학습을 하시는 것을 추천드립니다.
              </p>
              <p className="text-[14px]">
                ( 현재 사용자의 레벨에 상관없이 학습 가능한 상품입니다. )
              </p>
              <p className="text-[14px]">
                2. 시간 제한 없이 랜덤으로 출제되는 문제들을 통해 실력을
                향상시켜보세요!
              </p>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-10 items-center">
              <Image loading="lazy"
                src={"/images/dashboard/level-practice.png"}
                alt={"level-practice"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[300px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/main-exam.png"}
                alt={"main-exam"}
                width={500}
                height={500}
                className="w-[450px] h-[300px] p-2 rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/result.png"}
                alt={"result"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[250px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
            </div>

            <div className="mt-10" />
            <StudyHeader label={"파트별 연습문제"} />
            <div className="my-5 gap-y-2 flex flex-col">
              <p className="text-[14px]">
                1. 토익두잇 파트별 연습문제는 자신의 취약한 파트를 중심으로
                공부하기 위해 제공하는 상품입니다.
              </p>
              <p className="text-[14px]">
                2. 시간 제한 없이 랜덤으로 출제되는 문제들을 통해 실력을
                향상시켜보세요!
              </p>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-10 items-center">
              <Image loading="lazy"
                src={"/images/dashboard/part-practice.png"}
                alt={"part-practice"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[300px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/main-exam.png"}
                alt={"main-exam"}
                width={500}
                height={500}
                className="w-[450px] h-[300px]  p-2 rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/result.png"}
                alt={"result"}
                width={500}
                height={500}
                className="p-2 w-[400px] h-[250px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
            </div>

            <div className="mt-10" />
            <StudyHeader label={"오답 체크"} />
            <p className="mt-5 text-[14px]">
              정답 확인 후 꼼꼼한 오답 정리로 실력 UP! 틀린 문제는 다시
              풀어보고, 상세 해설로 완벽 이해해보세요!
            </p>
            <div className="mt-10 flex flex-wrap gap-x-3 gap-y-10 items-center">
              <Image loading="lazy"
                src={"/images/recommend/score-check.png"}
                alt={"score-check"}
                width={500}
                height={500}
                className="p-1 w-[300px] h-[500px] rounded-xl border-slate-100 border-2 shadow-lg"
              />
              <Image loading="lazy"
                src={"/svgs/icons/right-arrow-gradient-icon.svg"}
                alt={"right-arrow-gradient-icon"}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <Image loading="lazy"
                src={"/images/dashboard/main-exam.png"}
                alt={"main-exam"}
                width={500}
                height={500}
                className="w-[500px] h-[300px] p-2 rounded-xl border-slate-100 border-2 shadow-lg"
              />
            
            </div>


            <div className="mt-20" />
            <div className="flex flex-row gap-x-5 items-end">
              <h1 className="text-3xl mb-2 text-[var(--blue1)]">Step 3.</h1>
              <h1 className="text-xl mb-2 font-medium">
                내 토익 실력, 한눈에 확인!
              </h1>
            </div>

            <p className="mt-3 text-[14px]">
              현재 자신의 공부 기록을 체크하고 나만의 성장 그래프를 확인하세요!
            </p>
            <p className="mt-2 mb-5 text-[12px] text-blue-500">
              ※ 마이페이지에서 확인하실 수 있는 상품입니다.
            </p>
            <Image loading="lazy"
              src={"/images/recommend/result.png"}
              alt={"result"}
              width={600}
              height={500}
              className="p-1 w-[600px] h-[500px] rounded-xl border-slate-100 border-2 shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
