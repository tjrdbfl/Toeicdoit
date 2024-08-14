'use client';
import LinkIcon from "@/components/common/LinkIcon";
import ScoreBtn from "@/components/toeic/ScoreBtn";
import { PG } from "@/constants/enums/PG";
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
import { useResultStore } from "@/store/toeic/store";

export default function ScorePage() {

  const {type,name,score,lc_score,rc_score,BarData,timeElapsed}=useResultStore();
  // type data = {
  //   BarData: number[]; //파트별 점수 합산
  //   score: number; //level 정제 필요 score/100
  //   lc_score: number;
  //   rc_score: number;
  //   RadarData: number[]; //듣기, 어휘, 구조, 문법, 독해 별 정보
  //   timeElapsed: number;
  // };
  
  // let result: data = {
  //   BarData: [20, 10, 19, 50, 20, 22, 57],
  //   score: 820,
  //   lc_score: 419,
  //   rc_score: 401,
  //   RadarData: [65, 59, 90, 81, 56],
  //   timeElapsed: 80,
  // };

  const UserBarData = {
    label: "내 파트별 실력",
    data: BarData,
    backgroundColor: "rgba(18, 17, 17, 0.3)",
  };
  const PartBarData = calculateBarData(score);

  const PieLCLabels = [
    `나의 총 점수 : ${lc_score}점`,
    "총 점수 : 495점",
  ];
  const PieRCLabels = [
    `나의 총 점수 : ${rc_score}점`,
    "총 점수 : 495점",
  ];
  const UserLCPieData = [lc_score, 495 - lc_score];
  const UserRCPieData = [rc_score, 495 - rc_score];

  const LevelRadarData: number[] = calculateRadarData(score) || [];
  const radarLabel = [
    ["듣기", `${LevelRadarData[0]}/90`],
    ["어휘", `${LevelRadarData[1]}/90`],
    ["구조", `${LevelRadarData[2]}/90`],
    ["문법", `${LevelRadarData[3]}/90`],
    ["독해", `${LevelRadarData[4]}/90`],
  ];

  const DoughnutUserData = [timeElapsed/60000, 120 - timeElapsed/60000];
  const DoughnutOtherData = [
    calculateTimeData(score),
    120 - calculateTimeData(score),
  ];
  const DoughnutUserTime = calculateTime(timeElapsed);
  const DoughnutOtherTime = calculateTime(calculateTimeData(score));

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mt-20 px-20 min-h-screen">
        <div className="bg-blue-50 justify-center shadow-xl rounded-2xl border-slate-200 border-2 lg:w-[650px] p-5 animate-slidein300">
          <div className="flex flex-row justify-center ">
            <LinkIcon size={20} />
            <div className="ml-2 form_title text-xl text-center font-semibold text-black">
              {name}님의 점수는 {score}점 입니다.
            </div>
          </div>

          <div className="flex flex-wrap gap-10 justify-center">
            <RadarContainer
              score={score}
              UserRadarData={[65, 59, 90, 81, 56]}
              LevelRadarData={LevelRadarData}
              labels={radarLabel}
            />
            <DoughnutContainer
              score={score}
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
            score={score}
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
            <ScoreBtn type={type} label={"오답 하러 가기"} />
            <ScoreBtn type={type} label={"응시하기 전으로 돌아가기"}/>
          </div>
        </div>
      </div>
    </>
  );
}
