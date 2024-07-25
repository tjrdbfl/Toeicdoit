import DoughnutChart from "@/components/chart/DoughnutChart";
import RadarChart from "@/components/chart/RadarChart";
import { result } from "lodash";

const DoughnutContainer = ({
    score,DoughnutUserData,DoughnutOtherData,DoughnutUserTime,DoughnutOtherTime
}:{
    score:number;
    DoughnutUserData: number[];
    DoughnutOtherData: number[];
    DoughnutUserTime: {
        hour: number;
        minute: number;
    };
    DoughnutOtherTime: {
        hour: number;
        minute: number;
    }
}) => {
    return (
        <>
              <div className="w-[300px]">
                  <div className="text-black font-semibold text-lg">
                    풀이 시간 분석
                  </div>
                  <div className="mt-2" />
                  <div className="text-slate-500 text-[14px] mb-3">
                    회원님과 {score}점 사용자 풀이 시간 차이입니다. 이
                    그래프는 회원님과 비슷한 점수대 사용자 간의 문제당 평균 풀이
                    시간 차이를 보여줍니다. 이를 통해 자신의 약점을 보완해보세요.
                  </div>
                  <div className="mt-5">
                    <div className="bg-white px-3 py-7 shadow-lg rounded-xl border-slate-100 border-2 w-[100%] h-auto flex items-center justify-center">
                      <div className="flex flex-row justify-between w-[350px]">
                        <div className="w-[120px] flex flex-col gap-x-2">
                          <DoughnutChart
                            data={DoughnutUserData}
                            text={`${
                              Math.floor(DoughnutUserTime.hour / 10) === 0
                                ? `0${DoughnutUserTime.hour}`
                                : DoughnutUserTime.hour
                            } : ${DoughnutUserTime.minute}`}
                          />
                          <p className="text-black text-[12px] font-medium text-center text-pretty mt-3">
                            회원님의 풀이 시간입니다.
                          </p>
                        </div>
                        <div className="w-[120px] flex flex-col">
                          <DoughnutChart
                            data={DoughnutOtherData}
                            text={`${
                              Math.floor(DoughnutOtherTime.hour / 10) === 0
                                ? `0${DoughnutOtherTime.hour}`
                                : DoughnutOtherTime.hour
                            } : ${DoughnutOtherTime.minute}`}
                          />
                          <p className="text-black text-[12px] font-medium text-center text-pretty mt-3">
                            회원님과 비슷한 점수를 가진 회원들의 풀이
                            시간입니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    );
}
export default DoughnutContainer;


