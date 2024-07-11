import PieChart from "@/components/chart/PieChart";
import LinkIcon from "@/components/common/LinkIcon";

const PieContainer = ({
    UserLCPieData,PieLCLabels,UserRCPieData,PieRCLabels
}:{
    UserLCPieData:number[]
    ,PieLCLabels:string[]
    ,UserRCPieData:number[]
    ,PieRCLabels:string[]
}) => {
    return (<>
        <div className="flex flex-wrap w-full justify-center gap-y-10 gap-x-10">
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-2">
                    <LinkIcon size={28} />
                    <div className="text-black font-semibold text-xl">LC 풀이 점수</div>
                </div>
                <div className="mt-4" />
                <div className="border-slate-200 border-2 rounded-xl p-3 shadow-lg bg-white">
                    <div className="w-[260px]">
                        <PieChart UserScoreData={UserLCPieData} labels={PieLCLabels} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-2">
                    <LinkIcon size={28} />
                    <div className="text-black font-semibold text-xl">RC 풀이 점수</div>
                </div>
                <div className="mt-4" />
                <div className="border-slate-200 border-2 rounded-xl p-3 shadow-lg bg-white">
                    <div className="w-[260px]">
                        <PieChart UserScoreData={UserRCPieData} labels={PieRCLabels} />
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default PieContainer;