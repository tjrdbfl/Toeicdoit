import LineChart from "@/components/chart/LineChart";
import LinkIcon from "@/components/common/LinkIcon";
import StudyCard from "@/components/study/StudyCard";
import { FrequentlyAsk } from "@/constants/study/faq";

const ResultPage = () => {

    return (<>
        <div className="total_padding">

            <div className="flex flex-row gap-x-2">
                <LinkIcon size={35} />
                <div className="text-black text-3xl font-medium mb-10">학업 성취도</div>
            </div>

            <div className="bg-blue-50 shadow-md rounded-2xl border-slate-200 border-2 w-full p-[2%]">
            <div className="w-full h-[500px] bg-white p-5 rounded-xl shadow-lg border-slate-200 border-2 flex items-center justify-center">
                <LineChart />
            </div>
            </div>
                
            
            <div className="mt-10"/>
            <div className="flex flex-row gap-x-2">
                <LinkIcon size={35} />
                <div className="text-black text-3xl font-medium mb-10">문제 풀이 기록</div>
            </div>

        </div>


    </>);
}
export default ResultPage;