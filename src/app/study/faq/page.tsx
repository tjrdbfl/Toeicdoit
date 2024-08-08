import LinkIcon from "@/components/common/LinkIcon";
import MainHeader from "@/components/common/MainHeader";
import StudyCard from "@/components/study/StudyCard";
import { FrequentlyAsk } from "@/constants/study/constants";
import StudyFAQRecipe1 from "@/templates/study/StudyFAQRecipe1";
import StudyFAQRecipe2 from "@/templates/study/StudyFAQRecipe2";
import StudyFAQRecipe3 from "@/templates/study/StudyFAQRecipe3";

const metadata = {
  title: "Toeicdoit - Study FAQ Page",
};
export default function StudyFAQPage() {
  return (
    <div className="lg:px-[20%]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="text-black text-[14px] mb-7 ml-2">
            토익두잇 공부법 FAQ
          </div>
          <MainHeader label={"자주 묻는 질문"} />
          <div className="mt-5" />
          <div key="FrequentlyAsk" className="flex flex-col gap-y-5">
            {FrequentlyAsk.map((item) => (
              <StudyCard key={item.id} FAQ={item} />
            ))}
          </div>
        </div>

        <video
          width="60%"
          autoPlay
          muted
          preload="auto"
          playsInline
          className="h-[50%] pointer-events-none hidden lg:block"
        >
          <source src="/videos/main.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full h-auto mt-10">
        <div className="gradient-01 opacity-95 w-full" />
        <div className="text-black text-[14px] mb-7 ml-2 z-10">학습 가이드</div>
        <MainHeader label={"점수대별 학습 레시피"} />
        <div className="mt-5" />
        <p className="text-black text-[16px]">안녕하세요, 토익두잇입니다.</p>
        <p className="text-black text-[16px]">
          토익두잇과 함께 즐겁게 학습하고 계신가요~?
        </p>
        <p className="text-black text-[16px]">
          학습을 어떻게 시작해야 할지 망설이고 계셨을 분들을 위해 [점수대별
          학습비법 레시피]를 준비했습니다!
        </p>
        <p className="text-black text-[16px]">
          토익두잇의 점수대 별 학습 꿀팁을 얻어 보세요!
        </p>
        <p className="text-black text-[16px]">
          산타와 함께 효율적인 학습으로 목표 점수까지 빠르게 달성해 보세요!
        </p>
      </div>
      <StudyFAQRecipe1/>
      <StudyFAQRecipe2/>
      <StudyFAQRecipe3/>
    </div>
  );
}
