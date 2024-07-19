import RadarChart from "@/components/chart/RadarChart";
const RadarContainer = ({
    score,labels,UserRadarData,LevelRadarData
}:{
    score:number;
    labels:(string | string[])[];
    UserRadarData:number[];
    LevelRadarData:number[];
}) => {
    return (
        <>
            <div className="w-[350px]">
                <div className="text-black font-semibold text-xl text-pretty">토익 실력</div>
                <div className="mt-2" />
                <div className="text-slate-500 text-lg mb-5">토익 두잇은 5개의 지표로 회원님의 토익 실력을 측정합니다. 그래프는 회원님과 {score}점 사용자의 토익 실력 정답률 차이를 의미합니다.</div>
                <div className="w-[350px] h-[350px] bg-white p-3 rounded-xl shadow-lg border-slate-200 border-2 flex items-center justify-center">
                    <RadarChart labels={labels} UserData={UserRadarData} LevelData={LevelRadarData} />
                </div>
            </div>
        </>
    );
}
export default RadarContainer;


