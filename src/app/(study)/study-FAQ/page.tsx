import LinkIcon from "@/components/common/LinkIcon";
import StudyCard from "@/components/study/StudyCard";
import { FrequentlyAsk } from "@/constants/study/faq";

const metadata={
    title:"Toeicdoit - Study FAQ Page"  
}
export default function StudyFAQPage() {


    return (
        <>
            <div className="total_padding py-8 flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="text-black text-md mb-7 ml-2">토익두잇 공부법 FAQ</div>
                    <div className="flex flex-row gap-x-2">
                        <LinkIcon size={30} />
                        <div className="text-black text-3xl font-medium mb-10">자주 묻는 질문</div>
                    </div>

                    <div
                        key="FrequentlyAsk"
                        className="flex flex-col gap-y-5">
                        {FrequentlyAsk.map((item) => (
                            <StudyCard
                                key={item.id}
                                FAQ={item} />

                        ))}
                    </div>

                </div>

                <video
                    width="50%"
                    autoPlay
                    muted
                    preload="auto"
                    playsInline
                    className='h-[50%] pointer-events-none'
                >
                    <source
                        src='/videos/main.mp4'
                        type="video/mp4"
                    />
                </video>

            </div>

            <div className="w-full h-auto total_padding mt-10">
                <div className="gradient-01 opacity-95 w-full" />
                <div className="text-black text-md mb-7 ml-2 z-10">학습 가이드</div>
                <div className="flex flex-row gap-x-2 z-10">
                    <LinkIcon size={30} />
                    <div className="text-black text-3xl font-medium mb-10">점수대별 학습 레시피</div>
                </div>
                <p className="text-black text-lg">안녕하세요, 토익두잇입니다.</p>
                <p className="text-black text-lg">
                    토익두잇과 함께 즐겁게 학습하고 계신가요~?
                </p>
                <p className="text-black text-lg">학습을 어떻게 시작해야 할지 망설이고 계셨을 분들을 위해 [점수대별 학습비법 레시피]를 준비했습니다!</p>
                <p className="text-black text-lg">
                토익두잇의 점수대 별 학습 꿀팁을 얻어 보세요!
                </p>
                <p className="text-black text-lg">
                산타와 함께 효율적인 학습으로 목표 점수까지 빠르게 달성해 보세요!
                </p>

            </div>
        </>

    );
}