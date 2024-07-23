import LineChart from "@/components/chart/LineChart";
import LinkIcon from "@/components/common/LinkIcon";
import ResultContainer from "@/templates/my-page/ResultContainer";


const ResultPage = () => {
    const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    const data1:number[]=[32, 42, 51, 60, 51, 95, 97];
    const data2:number[]=[37, 42, 41, 37, 31, 44, 42];
    const data3:number[]=[60, 54, 54, 28, 27, 49, 52];
    const data4:number[]=[37, 74, 41, 30, 35];
    const data=[data1,data2,data3,data4];
                    
    return (<>
        <div className="px-[5%] mt-16">

            <div className="mt-16 xl:mt-0"/>
            <div className="flex flex-row gap-x-2">
                <LinkIcon size={35} />
                <div className="text-black text-3xl font-medium mb-10">학업 성취도</div>
            </div>

            <div className="bg-blue-50 shadow-md rounded-2xl border-slate-200 border-2 w-full p-[2%]">
            <div className="w-full h-[500px] bg-white p-5 rounded-xl shadow-lg border-slate-200 border-2 flex items-center justify-center">
                <LineChart label={labels} data={data}  />
            </div>
            </div>
                
            
            <div className="mt-16"/>
            <div className="flex flex-row gap-x-2">
                <LinkIcon size={35} />
                <div className="text-black text-3xl font-medium mb-10">문제 풀이 기록</div>
            </div>
            <ResultContainer/>
        </div>


    </>);
}
export default ResultPage;