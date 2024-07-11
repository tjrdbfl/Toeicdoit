'use server';
import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import StarIcon from '@mui/icons-material/Star';
import InsightsIcon from '@mui/icons-material/Insights';
import Image from "next/image";
import StartLevelTestBtn from "@/components/button/StartLevelTestBtn";
import LinkIcon from "@/components/common/LinkIcon";
import RadarContainer from "@/templates/toeic/RadarContainer";
import PieContainer from "@/templates/toeic/PieContainer";
import { p8 } from "@/constants/chart/bar";
import BarChart from "@/components/chart/BarChart";
import { lv8 } from "@/constants/chart/radar";

export default async function LevelTestPage() {
    const UserBarData = {
        label: "내 파트별 실력",
        data: [20, 10, 19, 50, 20, 22, 57],
        backgroundColor: "rgb(18, 17, 17, 0.5)",
    }
    const PieLCLabels = ['나의 총 점수 : 450점', '총 점수 : 495점'];
    const PieRCLabels = ['나의 총 점수 : 389점', '총 점수 : 495점'];
    const UserLCPieData = [333, 162];
    const UserRCPieData = [333, 162];
    
    const labels = [['듣기', `${lv8[0]}/90`], ['어휘',`${lv8[1]}/90`], ['구조',`${lv8[2]}/90`], ['문법',`${lv8[3]}/90`], ['독해',`${lv8[4]}/90`]];
    const UserRadarData = [65, 59, 90, 81, 56];

    return (<>
        <Navbar />
        <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
            <div className="w-full flex justify-center items-center px-[5%] xl:px-[20%]">
                <div className="bg-blue-50 shadow-lg rounded-xl w-full h-auto p-10 flex flex-col justify-center items-center">
                    <div className="flex flex-row gap-x-2 w-full justify-center">
                        <InsightsIcon className="text-blue-600  md:text-2xl lg:text-3xl" />
                        <p className="text-black  md:text-xl lg:text-2xl font-bold text-center">단, 20분 만에 </p>
                        <p className="border-b-red-500 border-b-4 text-blue-500 md:text-xl lg:text-2xl font-bold text-center bg-yellow-100">지금 나의 TOEIC 실력을 파악해보세요!</p>
                        <StarIcon className="text-yellow-300 md:text-xl lg:text-2xl transform rotate-12" />
                    </div>
                    <div className="mt-20 xl:mt-32" />
                    <div className="flex">
                        <div className="order-2 z-10 bg-white shadow-md w-[350px] lg:w-[500px] 2xl:w-[600px] p-10 flex flex-col justify-center items-center">
                            <div className="level_header w-full p-5 lg:text-2xl 2xl:text-4xl text-slate-500 text-center relative">
                                TEST
                                <div className="flex w-full justify-end">
                                    <div className="object-fit rounded-full w-[120px] md:w-[160px] h-[160px] transform rotate-12 absolute top-0 right-0"> <div />
                                        <Image
                                            src={"/images/level-test/level-test-score.png"}
                                            alt={"level-test-score"}
                                            width={180}
                                            height={180}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className=" text-zinc-600 font-bold lg:text-2xl 2xl:text-3xl mt-10 text-center">무료 레벨테스트</p>
                            <p className="text-zinc-700 text-center text-md lg:text-xl 2xl:text-2xl mt-10 font-medium text-pretty">지금 바로 내 실력 확인하고 맞춤 학습 전략 세우기!</p>
                            <div className="bg-zinc-200 w-[260px] lg:w-[420px] 2xl:w-[480px] h-[10px] rounded-full" />
                            <p className="text-zinc-700 text-center text-md lg:text-xl 2xl:text-2xl mt-5 font-medium border-b-zinc-400">레벨 테스트를 통해</p>
                            <div className="bg-zinc-200 w-[120px] lg:w-[150px] 2xl:w-[180px] h-[10px] rounded-full" />
                            <p className="text-zinc-700 text-center text-md lg:text-xl 2xl:text-2xl mt-5 font-medium border-b-zinc-400">자신의 약점을 파악하고 강화해보세요! </p>
                            <div className="bg-zinc-200 w-[250px] lg:w-[310px] 2xl:w-[370px] h-[10px] px-12 rounded-full" />
                            <div className="flex flex-row">
                                <p className="text-black text-[50px] lg:text-[100px] font-bold">0</p>
                                <p className="text-black text-[30px] lg:text-[60px] font-bold mt-5 lg:mt-10">원</p>
                            </div>
                        </div>
                        <div className="absolute shadow-lg order-1 z-0 bg-blue-600 w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[600px] h-[500px] lg:h-[600px] transform -rotate-12" />
                    </div>
                    <div className="mt-32" />
                    <div className="flex h-[60px] lg:h-[120px] flex-row">
                        <div className="z-0">
                            <StartLevelTestBtn />
                        </div>
                        <div className="absolute order-2 z-10 ml-36 lg:ml-44 -mt-10 w-[130px] lg:w-[200px]">
                            <Image
                                src={"/images/level-test/level-test-point.png"}
                                alt={"level-test-poing"}
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[5%] xl:px-[20%]">
                <div className="flex flex-row gap-x-2 mt-20 ">
                    <LinkIcon size={28} />
                    <h2 className="text-black font-semibold text-xl lg:text-2xl">빠른</h2>
                    <h2 className="text-blue-500 font-semibold text-xl lg:text-2xl">진단 테스트</h2>
                    <h2 className="text-black font-semibold text-xl lg:text-2xl">결과</h2>
                </div>
                <div className="border-slate-100 border-2 bg-white shadow-lg rounded-xl w-full h-auto p-10 flex flex-col justify-center items-center mt-5">
                    <div className="flex flex-col">
                    <RadarContainer UserRadarData={UserRadarData} LevelRadarData={lv8} labels={labels} />
                        <div className="w-full mt-10">
                            <PieContainer UserLCPieData={UserLCPieData} PieLCLabels={PieLCLabels} UserRCPieData={UserRCPieData} PieRCLabels={PieRCLabels} />
                        </div>
                    </div>
                    <div className="mt-10" />
                    <div className="w-full text-start text-black font-semibold text-xl">파트별 실력</div>
                    <div className="mt-2" />
                    <div className="w-full text-start text-slate-500 text-lg mb-3">회원님과 800점 사용자 파트별 정답률 차이입니다.</div>
                    <div className="bg-white p-4 shadow-lg rounded-xl border-slate-200 border-2 w-[100%] h-auto flex items-center justify-center">
                        <BarChart UserScoreData={UserBarData} p={p8} />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}









