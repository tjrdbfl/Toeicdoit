import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import ExplanationBtn from "@/components/toeic/ExplanationBtn";
import LinkIcon from "@/components/common/LinkIcon";
import ToeicGoBackBtn from "@/components/toeic/ToeicGoBackBtn";
import ScoreBtn from "@/components/toeic/ScoreBtn";
import { PG } from "@/constants/enums/PG";
import { SERVER } from "@/constants/enums/API";
import BarChart from "@/components/chart/BarChart";
import { p1 } from "@/constants/chart/bar";
import PieChart from "@/components/chart/PieChart";
import RadarChart from "@/components/chart/RadarChart";
import PieContainer from "@/templates/toeic/PieContainer";
import RadarContainer from "@/templates/toeic/RadarContainer";
import BarContainer from "@/templates/toeic/BarContainer";
import DoughnutChart from "@/components/chart/DoughnutChart";

export default async function ScorePage() {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TOEIC}`, {
            method: ''
        })

    } catch (err) {

    }

    type data = {
        BarData: number[];     //파트별 점수 합산 
        score: number;       //level 정제 필요 score/100
        LC_score: number;
        RC_Score: number;
        RadarData: number[];     //듣기, 어휘, 구조, 문법, 독해 별 정보
    }

    const UserBarData = {
        label: "내 파트별 실력",
        data: [20, 10, 19, 50, 20, 22, 57],         //back-end
        backgroundColor: "rgba(254, 250, 193, 0.8)",
    }

    const PieLCLabels = ['나의 총 점수 : ooo점', '총 점수 : 495점'];
    const PieRCLabels = ['나의 총 점수 : ooo점', '총 점수 : 495점'];
    const UserLCPieData = [333, 162];
    const UserRCPieData = [333, 162];

    const labels = [['듣기', '80/90'], ['어휘',], '구조', '문법', '독해'];
    const UserRadarData = [65, 59, 90, 81, 56];
    const LevelRadarData = [28, 48, 40, 19, 96];

    return (<>
        <div>
            <Navbar />
            <div className="w-full flex flex-col place-items-center py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] px-5 sm:px-20 lg:px-0">
                <div className="bg-blue-50 shadow-2xl rounded-2xl border-slate-200 border-2 w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-[2%] animate-slidein300">
                    <div className="flex flex-row justify-center">
                        <LinkIcon size={35} />
                        <div className="ml-2 form_title text-3xl text-center font-semibold text-black mb-[5%]">
                            { }님의 점수는 { }입니다.
                        </div>
                    </div>

                    <RadarContainer UserRadarData={UserRadarData} LevelRadarData={LevelRadarData} labels={labels} />

                    <div className="mt-24" />
                    <div className="text-black font-semibold text-2xl">풀이 시간 분석</div>
                    <div className="mt-2" />
                    <div className="text-slate-500 text-xl mb-3">회원님과 { }점 사용자 파트별 정답률 차이입니다.</div>
                    <div className="bg-white p-4 shadow-lg rounded-xl border-slate-200 border-2 w-[100%] h-auto flex items-center justify-center">
                        <DoughnutChart />
                    </div>



                    <div className="mt-24" />
                    <BarContainer UserBarData={UserBarData} PartBarData={p1} />

                    <div className="mt-28" />

                    <PieContainer UserLCPieData={UserLCPieData} PieLCLabels={PieLCLabels} UserRCPieData={UserRCPieData} PieRCLabels={PieRCLabels} />
                    <div className="mt-20" />

                    <div className="flex flex-wrap sm:flex-row justify-center gap-y-5 md:gap-x-20">
                        <ScoreBtn label={"오답 하러 가기"} url={`${PG.LEVEL}/${1}`} />
                        <ScoreBtn label={"응시하기 전으로 돌아가기"} url={`${PG.LEVEL}`} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </>);
}