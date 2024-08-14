import BarChart from "@/components/chart/BarChart";

const BarContainer = ({
    score,
    UserBarData,
    PartBarData,
}:{
    score:number,
    UserBarData:{label:string,data:number[],backgroundColor:string};
    PartBarData:{label:string,data:number[],backgroundColor:string},
}) => {
    return (<>
        <div className="px-5 w-full">
            <p className="w-full text-start text-black font-semibold text-lg">
              파트별 실력
            </p>
            <div className="mt-2" />
            <div className="w-full text-start text-slate-500 text-[14px] mb-3">
              회원님과 {score}점 사용자 파트별 정답률 차이입니다.
            </div>
            <div className="bg-white p-4 shadow-lg rounded-xl border-slate-200 border-2 w-[100%] h-auto flex items-center justify-center">
              <BarChart UserScoreData={UserBarData} p={PartBarData} />
            </div>
            </div>

    </>);
}
export default BarContainer;