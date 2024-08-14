'use server';

import CloseBtn from "@/components/button/CloseBtn";
import SubmitButton from "@/components/button/SubmitBtn";
import ToeicSubmitBtn from "@/components/button/ToeicSubmitBtn";
import CustomPagination from "@/components/common/CustomPagination";
import LinkIcon from "@/components/common/LinkIcon";
import ToeicAnswer from "@/components/toeic/ToeicAnswer";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { splitStringToList } from "@/service/utils/utils";
import { MessageData } from "@/types/MessengerData";
import { I_ApiLevelTestResponse, OptionData, ToeicDataPublic, ToeicProblemData } from "@/types/ToeicData";

export default async function LevelTestPage({ searchParams }: {
    searchParams: { page: number }
}) {

    let toeic: ToeicProblemData = [{
        id: 0,
        sound: "",
        title: "",
        toeicIds: [],
        numberOfQuestions: 0,
        testType: "",
    }];

    const currentPage = Number(searchParams.page) || 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TOEIC_API_URL}/api/${SERVER_API.TOEIC}/test`, {
            method: 'GET',
            headers: CommonHeader,
            cache: 'no-store'
        })
        const data: ToeicProblemData = await response.json();

        if (data) {
            toeic = data;

        } else {
            console.error('Failed to get response data' + ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }

    const question:string[]=splitStringToList(toeic[0].toeicIds[currentPage].question);

    return (<>
        <audio
            //autoPlay
            src={toeic[0].sound}
            preload='none'
            className="hidden"
        />
        <div className="bg-white w-screen h-screen">
            <div className="flex flex-row w-full p-3">
                <CloseBtn url={`${PG.LEVEL_TEST}`} />
            </div>
            <div className="w-full flex justify-center items-center px-10">
                <div className="flex flex-col w-[768px] h-screen mt-16">
                    <div className="p-2">
                        <div className="flex flex-row gap-x-2 items-center">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-semibold text-2xl">토익두잇 레벨테스트</h1>
                        </div>
                        <div className="flex flex-col gap-y-7 mt-5">
                            <div className="text-black font-medium text-xl mt-2">Question {currentPage===0? 1:currentPage} .</div>
                            <div className="flex flex-col gap-y-2">
                            {question.map((qu,index)=>(
                                <p 
                                key={index}
                                className="text-black font-medium text-lg">{qu}</p>
                            ))}
                            </div>
                           
                            <ToeicAnswer op={toeic[0].toeicIds[currentPage].optionId} page={currentPage}/>
                        </div>

                        <div className="mt-5">
                            <div className="w-full flex justify-end">
                                {currentPage === toeic[0].toeicIds.length - 1 &&
                                    <ToeicSubmitBtn />
                                }
                            </div>
                        </div>

                    </div>
                    <div className="mt-5 flex w-full justify-end">
                        <CustomPagination totalPages={toeic[0].toeicIds.length-1} type={"single"} page={currentPage} />
                    </div>
                </div>

            </div>

        </div>
    </>);
}