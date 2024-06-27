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
        <div className="flex flex-wrap w-full justify-center xl:justify-between gap-y-10 xl:gap-x-7 gap-x-20">

            <div className="flex flex-col">

                <div className="flex flex-row gap-x-2">
                    <LinkIcon size={35} />
                    <div className="text-black font-semibold text-2xl">LC 풀이 점수</div>
                </div>

                <div className="mt-4" />

                <div className="border-slate-200 border-2 rounded-xl p-3 shadow-lg bg-white">
                    <div className="md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
                        <PieChart UserScoreData={UserRCPieData} labels={PieRCLabels} />
                    </div>
                </div>
            </div>


            <div className="flex flex-col">

                <div className="flex flex-row gap-x-2">
                    <LinkIcon size={35} />
                    <div className="text-black font-semibold text-2xl">RC 풀이 점수</div>
                </div>

                <div className="mt-4" />

                <div className="border-slate-200 border-2 rounded-xl p-3 shadow-lg bg-white">
                    <div className="md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
                        <PieChart UserScoreData={UserRCPieData} labels={PieRCLabels} />
                    </div>
                </div>
            </div>
        </div>

    </>);
}
export default PieContainer;