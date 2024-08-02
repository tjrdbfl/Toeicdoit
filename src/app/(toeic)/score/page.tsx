import LinkIcon from "@/components/common/LinkIcon";
import ScoreBtn from "@/components/toeic/ScoreBtn";
import { PG } from "@/constants/enums/PG";
import { SERVER } from "@/constants/enums/API";
import PieContainer from "@/templates/chart/PieContainer";
import RadarContainer from "@/templates/chart/RadarContainer";
import BarContainer from "@/templates/chart/BarContainer";

import {
  calculateBarData,
  calculateRadarData,
  calculateTime,
  calculateTimeData,
} from "@/service/toeic/util";
import DoughnutContainer from "@/templates/chart/DoughnutContainer";

export default function ScorePage() {
  async function getUserResult() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TOEIC}`,
        {
          method: "",
        }
      );
    } catch (err) {}
  }

  type data = {
    BarData: number[]; //파트별 점수 합산
    score: number; //level 정제 필요 score/100
    LC_score: number;
    RC_Score: number;
    RadarData: number[]; //듣기, 어휘, 구조, 문법, 독해 별 정보
    timeElapsed: number;
  };
  let username: string = "회원";
  let result: data = {
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
      <div className="w-full flex flex-col justify-center items-center mt-20 px-20 min-h-screen">
        <div className="bg-blue-50 justify-center shadow-xl rounded-2xl border-slate-200 border-2 lg:w-[650px] p-5 animate-slidein300">
          <div className="flex flex-row justify-center ">
            <LinkIcon size={20} />
            <div className="ml-2 form_title text-xl text-center font-semibold text-black">
              {username}님의 점수는 {result.score}점 입니다.
            </div>
          </div>

          <div className="flex flex-wrap gap-10 justify-center">
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

          <div className="mt-10" />
          <BarContainer
            UserBarData={UserBarData}
            PartBarData={PartBarData}
            score={result.score}
          />

          <div className="mt-10" />

          <PieContainer
            UserLCPieData={UserLCPieData}
            PieLCLabels={PieLCLabels}
            UserRCPieData={UserRCPieData}
            PieRCLabels={PieRCLabels}
          />
          <div className="mt-10" />

          <div className="flex flex-row justify-center gap-x-10">
            <ScoreBtn label={"오답 하러 가기"} url={`${PG.LEVEL}/${1}`} />
            <ScoreBtn label={"응시하기 전으로 돌아가기"} url={`${PG.LEVEL}`} />
          </div>
        </div>
      </div>
    </>
  );
}
