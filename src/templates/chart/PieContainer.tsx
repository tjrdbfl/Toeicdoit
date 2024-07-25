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
        <div className="flex flex-wrap w-full gap-10 justify-center">
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-2 items-centerr">
                    <LinkIcon size={20} />
                    <div className="text-black font-semibold text-lg">LC 풀이 점수</div>
                </div>
                <div className="mt-4" />
                <div className="border-slate-100 border-2 rounded-xl p-2 shadow-lg bg-white">
                    <div className="w-[200px]">
                        <PieChart UserScoreData={UserLCPieData} labels={PieLCLabels} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-2 items-center">
                    <LinkIcon size={20} />
                    <div className="text-black font-semibold text-lg">RC 풀이 점수</div>
                </div>
                <div className="mt-4" />
                <div className="border-slate-100 border-2 rounded-xl p-3 shadow-lg bg-white">
                    <div className="w-[200px]">
                        <PieChart UserScoreData={UserRCPieData} labels={PieRCLabels} />
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default PieContainer;