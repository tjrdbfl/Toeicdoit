import StudyRecipeCard from "@/components/study/StudyRecipeCard";
import { StudyRecipe1, StudyRecipe2 } from "@/constants/study/constants";

export default function StudyFAQRecipe3() {
  return (
    <>
      <h1 className="mt-10 text-xl font-semibold text-black">
        🎯 점수대별 학습 레시피
      </h1>
      <div className="bg-zinc-200 h-0.5 w-full my-3" />
      <div className="flex flex-col gap-y-5 border-slate-100 border-2 p-10 w-[400px] rounded-xl shadow-md">
        <h2 className="text-lg font-semibold ">
          🥇 입문 - 450점, 토익이 처음인 토린이
        </h2>
        <h2 className="text-lg font-semibold mt-5">
          🥈 450 - 650점, 토익 꿈나무
        </h2>
        <h2 className="text-lg font-semibold mt-5">
          🥉 650 - 850점, 예비 토익 마스터
        </h2>
        <h2 className="text-lg font-semibold mt-5">🏅 850점 이상 토익 고수</h2>
      </div>
      <div className="mt-10" />
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col w-[50%]">
          <div className="rounded-full w-[350px] text-center bg-blue-50 font-semibold text-lg p-3">
            🥇 입문 - 450점, 토익이 처음인 토린이
          </div>
          <div className="bg-zinc-200 h-0.5 w-full my-3" />
          <p className="text-zinc-700 px-5 mb-5">
            모두에게 처음은 존재해요. 입문부터 차근차근 시작해봐요:)
          </p>

          <StudyRecipeCard
            imgUrl={"/images/study/study_faq1.png"}
            title={"수준별 연습문제"}
            content={
              " 앞으로 토익 학습에 도움이 될 기초적인 문법이 모두 담겨 있어요. Level4 까지 풀어보면서 부족한 부분을 집중 학습해보세요!"
            }
          />
          
          <StudyRecipeCard
            imgUrl={"/images/dashboard/level-test.png"}
            title={"레벨 테스트"}
            content={
              " 꾸준히 레벨 테스트를 풀면서 점수 변화를 확인하여 학습 의욕을 높이고 목표 달성에 한 걸음 더 가까워질 수 있습니다."
            }
          />
        </div>

        <div className="flex flex-col w-[50%]">
          <div className="rounded-full w-[350px] text-center bg-blue-50 font-semibold text-lg p-3">
            🥈 450 - 650점, 토익 꿈나무
          </div>
          <div className="bg-zinc-200 h-0.5 w-full my-3" />
          <p className="text-zinc-700 px-5">꾸준한 문제풀이 및 연습을 통해 기초를 다져보세요!</p>
          <StudyRecipeCard
            imgUrl={"/images/dashboard/part-practice.png"}
            title={"파트별 연습문제"}
            content={
              "각 파트별 제한 시간을 설정하고 문제를 푸는 연습을 통해 실전 감각을 익힙니다. 학습을 통해 자신의 부족한 파트를 더욱 집중적으로 공부해 보세요!"
            }
          />
          
          <StudyRecipeCard
            imgUrl={"/images/study/study_faq2-2.png"}
            title={"실력 측정"}
            content={
              "토익두잇에서 제공하는 상품들은 모두 자신의 실력을 차트로 한 눈에 볼 수 있습니다. 객관적이 지표를 통해 약점을 더욱 보완하면서 공부해보세요!"
            }
          />
        </div>
      </div>

      <div className="flex flex-row gap-x-10 mt-16">
        <div className="flex flex-col w-[50%]">
          <div className="rounded-full w-[350px] text-center bg-blue-50 font-semibold text-lg p-3">
          🥉 650 - 850점, 예비 토익 마스터
          </div>
          <div className="bg-zinc-200 h-0.5 w-full my-3" />
          <p className="text-zinc-700 px-5 mb-5">
          이 점수대부터는 문제풀이 감각을 익히는 것이 중요해요!
          </p>
          <StudyRecipeCard
            imgUrl={"/images/dashboard/main-exam.png"}
            title={"실전 모의고사"}
            content={
              "실전 감각 향상: 실제 시험과 유사한 환경에서 모의고사를 풀면서 긴장감을 극복하고 시간 관리 능력을 향상시킬 수 있습니다."
            }
          />
          <div className="mt-10"/>
          <StudyRecipeCard
            imgUrl={"/images/study/study_faq2-2.png"}
            title={"토익두잇 오픈채팅방"}
            content={
              "토익두잇에서 제공하는 오픈 채팅방을 이용하여 혼자 해결하기 어려운 문제들을 스터디원들과 함께 토론하고 해결할 수 있습니다."
            }
          />
        </div>

        <div className="flex flex-col w-[50%]">
          <div className="rounded-full w-[350px] text-center bg-blue-50 font-semibold text-lg p-3">
          🏅 850점 이상 토익 고수
          </div>
          <div className="bg-zinc-200 h-0.5 w-full my-3" />
          <p className="text-zinc-700 px-5">사실 가장 점수를 올리기 어려운 구간이에요, 하지만 할 수 있어요!</p>
          <StudyRecipeCard
            imgUrl={"/images/dashboard/part-practice.png"}
            title={"자유게시판"}
            content={
              "자유게시판을 통해 최근 토익 트렌드에 대한 정보를 얻어가세요! 또한, 다른 사용자들과 토익 공부법을 공유하며 고득점을 달성해 보세요!"
            }
          />
          <div className="mt-10"/>
          <StudyRecipeCard
            imgUrl={"/images/study/study_faq4-2.png"}
            title={"마이페이지"}
            content={
              "마이페이지의 레벨테스트 및 문제풀이 항목의 학업 성취도를 분석하면서 자신의 학습 방법을 평가하고, 개선할 부분을 찾을 수 있습니다."
            }
          />
        </div>
      </div>
    </>
  );
}
