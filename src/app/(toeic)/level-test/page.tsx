import StarIcon from "@mui/icons-material/Star";
import InsightsIcon from "@mui/icons-material/Insights";
import Image from "next/image";
import StartLevelTestBtn from "@/components/button/StartLevelTestBtn";
import LinkIcon from "@/components/common/LinkIcon";
import RadarContainer from "@/templates/chart/RadarContainer";
import PieContainer from "@/templates/chart/PieContainer";
import { p8 } from "@/constants/chart/constant";
import BarChart from "@/components/chart/BarChart";
import { lv8 } from "@/constants/chart/constant";
import DoughnutContainer from "@/templates/chart/DoughnutContainer";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import DoughnutChart from "@/components/chart/DoughnutChart";
import {
  calculateBarData,
  calculateRadarData,
  calculateTimeData,
  calculateTime,
} from "@/service/toeic/util";
import { ChartData } from "@/types/ToeicData";
import BarContainer from "@/templates/chart/BarContainer";

export default function LevelTestPage() {
  let username: string = "회원";
  let result: ChartData = {
    BarData: [20, 10, 19, 50, 20, 22, 57],
    score: 820,
    LC_score: 419,
    RC_Score: 401,
    RadarData: [65, 59, 90, 81, 56],
    timeElapsed: 80,
  };

  const UserBarData = {
    label: "내 파트별 실력",
    data: result.BarData,
    backgroundColor: "rgba(18, 17, 17, 0.3)",
  };
  const PartBarData = calculateBarData(result.score);

  const PieLCLabels = [
    `나의 총 점수 : ${result.LC_score}점`,
    "총 점수 : 495점",
  ];
  const PieRCLabels = [
    `나의 총 점수 : ${result.RC_Score}점`,
    "총 점수 : 495점",
  ];
  const UserLCPieData = [result.LC_score, 495 - result.LC_score];
  const UserRCPieData = [result.RC_Score, 495 - result.RC_Score];

  const LevelRadarData: number[] = calculateRadarData(result.score) || [];
  const radarLabel = [
    ["듣기", `${LevelRadarData[0]}/90`],
    ["어휘", `${LevelRadarData[1]}/90`],
    ["구조", `${LevelRadarData[2]}/90`],
    ["문법", `${LevelRadarData[3]}/90`],
    ["독해", `${LevelRadarData[4]}/90`],
  ];

  const DoughnutUserData = [result.timeElapsed, 120 - result.timeElapsed];
  const DoughnutOtherData = [
    calculateTimeData(result.score),
    120 - calculateTimeData(result.score),
  ];
  const DoughnutUserTime = calculateTime(result.timeElapsed);
  const DoughnutOtherTime = calculateTime(calculateTimeData(result.score));

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col py-20 min-h-screen">
        <div className="w-full flex justify-center items-center">
          <div className="bg-blue-50 shadow-lg rounded-xl w-[700px] h-auto p-5 flex flex-col justify-center items-center">
            <div className="flex flex-row gap-x-2 w-full justify-center">
              <InsightsIcon className="text-blue-600 text-lg" />
              <p className="text-black text-lg font-bold text-center">
                단, 20분 만에{" "}
              </p>
              <p className="border-b-red-500 border-b-4 text-blue-500 text-lg font-bold text-center bg-yellow-100">
                지금 나의 TOEIC 실력을 파악해보세요!
              </p>
              <StarIcon className="text-yellow-300 text-lg transform rotate-12" />
            </div>
            <div className="mt-20" />
            <div className="flex">
              <div className="order-2 z-10 bg-white shadow-md w-[350px] h-[400px] p-10 flex flex-col justify-center items-center">
                <div className="level_header w-full p-5 text-slate-500 text-center relative">
                  TEST
                  <div className="flex w-full justify-end">
                    <div className="object-fit rounded-full w-[120px] h-[160px] transform rotate-12 absolute top-0 -right-16">
                      <Image loading="lazy"
                        src={"/images/level-test/level-test-score.png"}
                        alt={"level-test-score"}
                        width={250}
                        height={250}
                      />
                      <div />
                    </div>
                  </div>
                </div>
                <p className=" text-zinc-600 font-bold mt-5 text-center text-lg">
                  무료 레벨테스트
                </p>
                <p className="text-zinc-700 text-center text-md mt-5 font-medium text-pretty">
                  지금 바로 내 실력 확인하고 맞춤 학습 전략 세우기!
                </p>
                <div className="bg-zinc-200 w-[260px] lg:w-[420px] 2xl:w-[480px] h-[10px] rounded-full" />
                <p className="text-zinc-700 text-center text-md mt-5 font-medium border-b-zinc-400">
                  레벨 테스트를 통해
                </p>
                <div className="bg-zinc-200 w-[120px] lg:w-[150px] 2xl:w-[180px] h-[10px] rounded-full" />
                <p className="text-zinc-700 text-center text-md mt-5 font-medium border-b-zinc-400">
                  자신의 약점을 파악하고 강화해보세요!{" "}
                </p>
                <div className="bg-zinc-200 w-[250px] lg:w-[310px] 2xl:w-[370px] h-[10px] px-12 rounded-full" />
                <div className="flex flex-row">
                  <p className="text-black text-[50px] font-bold">0</p>
                  <p className="text-black text-[30px] font-bold mt-5">원</p>
                </div>
              </div>
              <div className="absolute shadow-lg order-1 z-0 bg-blue-600 w-[350px] h-[400px] transform -rotate-12" />
            </div>
            <div className="mt-20" />
            <div className="flex h-[60px] flex-row">
              <div className="z-0">
                <StartLevelTestBtn />
              </div>
              <div className="absolute order-2 z-10 ml-32 -mt-10 ">
                <Image loading="lazy"
                  src={"/images/level-test/level-test-point.png"}
                  alt={"level-test-poing"}
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 lg:px-[32%]">
          <div className="flex flex-row gap-x-2 mt-16 ">
            <LinkIcon size={28} />
            <h2 className="text-black font-semibold text-xl">빠른</h2>
            <h2 className="text-blue-500 font-semibold text-xl">진단 테스트</h2>
            <h2 className="text-black font-semibold text-xl">결과</h2>
          </div>
          <div className="border-slate-100 border-2 bg-white shadow-lg rounded-xl w-full h-auto p-10 flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-10 justify-between">
                <RadarContainer
                  score={result.score}
                  UserRadarData={result.RadarData}
                  LevelRadarData={LevelRadarData}
                  labels={radarLabel}
                />

                <DoughnutContainer
                  score={result.score}
                  DoughnutUserData={DoughnutUserData}
                  DoughnutOtherData={DoughnutOtherData}
                  DoughnutUserTime={DoughnutUserTime}
                  DoughnutOtherTime={DoughnutOtherTime}
                />
              </div>
              <div className="w-full mt-10">
                <PieContainer
                  UserLCPieData={UserLCPieData}
                  PieLCLabels={PieLCLabels}
                  UserRCPieData={UserRCPieData}
                  PieRCLabels={PieRCLabels}
                />
              </div>
            </div>

            <div className="mt-10" />
            <BarContainer
              UserBarData={UserBarData}
              PartBarData={PartBarData}
              score={result.score}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
