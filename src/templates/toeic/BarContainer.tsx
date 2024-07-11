import BarChart from "@/components/chart/BarChart";

const BarContainer = ({
    UserBarData,
    PartBarData,
}:{
    UserBarData:{label:string,data:number[],backgroundColor:string};
    PartBarData:{label:string,data:number[],backgroundColor:string},
}) => {
    return (<>
        <div className="text-black font-semibold text-xl">파트별 실력</div>
        <div className="mt-2" />
        <div className="text-slate-500 text-lg mb-3">회원님과 { }점 사용자 파트별 정답률 차이입니다.</div>
        <div className="bg-white p-4 shadow-lg rounded-lg border-slate-200 border-2 w-[100%] h-auto flex items-center justify-center">
            <BarChart UserScoreData={UserBarData} p={PartBarData} />
        </div>

    </>);
}
export default BarContainer;