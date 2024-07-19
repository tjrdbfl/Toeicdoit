import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import ExplanationBtn from "@/components/toeic/ExplanationBtn";
import LinkIcon from "@/components/common/LinkIcon";
import ToeicGoBackBtn from "@/components/toeic/ToeicGoBackBtn";
import ScoreBtn from "@/components/toeic/ScoreBtn";
import { PG } from "@/constants/enums/PG";
import { SERVER } from "@/constants/enums/API";
import BarChart from "@/components/chart/BarChart";
import { p1, p8 } from "@/constants/chart/constant";
import PieChart from "@/components/chart/PieChart";
import RadarChart from "@/components/chart/RadarChart";
import PieContainer from "@/templates/toeic/PieContainer";
import RadarContainer from "@/templates/toeic/RadarContainer";
import BarContainer from "@/templates/toeic/BarContainer";
import DoughnutChart from "@/components/chart/DoughnutChart";
import { store } from "@/redux";
import { getDecryptedUserData } from "@/store/auth/user-slice";
import { lv8 } from "@/constants/chart/constant";
import { calculateBarData, calculateRadarData, calculateTime, calculateTimeData } from "@/service/toeic/util";

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
        timeElapsed:number;
    }
    let username:string='회원';
    let result:data={
        BarData: [20, 10, 19, 50, 20, 22, 57],
        score: 820,
        LC_score: 419,
        RC_Score: 401,
        RadarData: [65, 59, 90, 81, 56],
        timeElapsed:80
    }

    const UserBarData = {
        label: "내 파트별 실력",
        data: result.BarData,         
        backgroundColor: "rgba(18, 17, 17, 0.3)",
    }
    const PartBarData=calculateBarData(result.score);

    const PieLCLabels = [`나의 총 점수 : ${result.LC_score}점`, '총 점수 : 495점'];
    const PieRCLabels = [`나의 총 점수 : ${result.RC_Score}점`, '총 점수 : 495점'];
    const UserLCPieData = [result.LC_score, 495-result.LC_score];
    const UserRCPieData = [result.RC_Score, 495-result.RC_Score];

    const LevelRadarData:number[] = calculateRadarData(result.score) || [];
    const radarLabel = [['듣기', `${LevelRadarData[0]}/90`], ['어휘', `${LevelRadarData[1]}/90`], ['구조', `${LevelRadarData[2]}/90`], ['문법', `${LevelRadarData[3]}/90`], ['독해', `${LevelRadarData[4]}/90`]];
    
    const DoughnutUserData=[result.timeElapsed,120-result.timeElapsed];
    const DoughnutOtherData=[calculateTimeData(result.score),120-calculateTimeData(result.score)];
    const DoughnutUserTime=calculateTime(result.timeElapsed);
    const DoughnutOtherTime=calculateTime(calculateTimeData(result.score));

    return (<>
        <div className="w-full flex flex-col justify-center place-items-center py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[2%]">
            <div className="bg-blue-50 justify-center shadow-2xl rounded-2xl border-slate-200 border-2 lg:w-[900px] p-10 mt-[2%] animate-slidein300">
                <div className="flex flex-row justify-center">
                    <LinkIcon size={28} />
                    <div className="ml-2 form_title text-2xl text-center font-semibold text-black mb-[5%]">
                        {username}님의 점수는 {result.score}점 입니다.
                    </div>
                </div>

                <div className="flex flex-wrap gap-20 justify-between">
                <RadarContainer score={result.score} UserRadarData={result.RadarData} LevelRadarData={LevelRadarData} labels={radarLabel} />
                
                    <div className="w-[370px]">
                        <div className="text-black font-semibold text-xl">풀이 시간 분석</div>
                        <div className="mt-2" />
                        <div className="text-slate-500 text-lg mb-3">회원님과 {result.score}점 사용자 풀이 시간 차이입니다. 이 그래프는 회원님과 비슷한 점수대 사용자 간의 문제당 평균 풀이 시간 차이를 보여줍니다.</div>
                        <div className="mt-5">
                            <div className="bg-white px-7 py-12 shadow-lg rounded-xl border-slate-200 border-2 w-[100%] h-auto flex items-center justify-center">
                                <div className="flex flex-row justify-between w-[350px]">
                                    <div className="w-[150px] flex flex-col">
                                    <DoughnutChart data={DoughnutUserData} text={`${Math.floor(DoughnutUserTime.hour/10)===0? `0${DoughnutUserTime.hour}`:DoughnutUserTime.hour} : ${DoughnutUserTime.minute}`} />
                                    <p className="text-black text-[18px] font-medium text-center text-pretty mt-3">회원님의 풀이 시간입니다.</p>
                                    </div>
                                    <div className="w-[150px] flex flex-col">
                                    <DoughnutChart data={DoughnutOtherData} text={`${Math.floor(DoughnutOtherTime.hour/10)===0? `0${DoughnutOtherTime.hour}`:DoughnutOtherTime.hour} : ${DoughnutOtherTime.minute}`} />
                                    <p className="text-black text-[18px] font-medium text-center text-pretty mt-3">회원님과 비슷한 점수를 가진 회원들의 풀이 시간입니다.</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="mt-16" />
                <BarContainer UserBarData={UserBarData} PartBarData={PartBarData} score={Math.floor(result.score/100)} />

                <div className="mt-16" />

                <PieContainer UserLCPieData={UserLCPieData} PieLCLabels={PieLCLabels} UserRCPieData={UserRCPieData} PieRCLabels={PieRCLabels} />
                <div className="mt-20" />

                <div className="flex flex-wrap sm:flex-row justify-center gap-y-5 md:gap-x-20">
                    <ScoreBtn label={"오답 하러 가기"} url={`${PG.LEVEL}/${1}`} />
                    <ScoreBtn label={"응시하기 전으로 돌아가기"} url={`${PG.LEVEL}`} />
                </div>
            </div>
        </div>
    </>);
}