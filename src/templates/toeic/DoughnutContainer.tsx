import RadarChart from "@/components/chart/RadarChart";
const DoughnutContainer = ({
    labels,UserRadarData,LevelRadarData
}:{
    labels:(string | string[])[];
    UserRadarData:number[];
    LevelRadarData:number[];
}) => {
    return (
        <>
            <div className="w-[350px] lg:w-[250px] 2xl:w-[350px]">
                <div className="text-black font-semibold text-xl">풀이 시간 분석</div>
                <div className="mt-2" />
                <div className="text-slate-500 text-lg mb-5">회원님과 800점 사용자의 풀이 시간 차이입니다. 이를 통해 시간을 단축해보는 전략을 잘 세워보세요.</div>
                <div className="w-[350px] lg:w-[250px] 2xl:w-[350px] bg-white p-3 rounded-xl shadow-lg border-slate-200 border-2 flex items-center justify-center">
                    <RadarChart labels={labels} UserData={UserRadarData} LevelData={LevelRadarData} />
                </div>
            </div>
        </>
    );
}
export default DoughnutContainer;


