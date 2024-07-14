'use server';

import CloseBtn from "@/components/button/CloseBtn";
import SubmitButton from "@/components/button/SubmitBtn";
import CustomPagination from "@/components/common/CustomPagination";
import LinkIcon from "@/components/common/LinkIcon";
import ToeicAnswer from "@/components/toeic/ToeicAnswer";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { MessageData } from "@/types/MessengerData";
import { I_ApiLevelTestResponse, OptionData, ToeicDataPublic } from "@/types/ToeicData";

export default async function LevelTestPage({ searchParams }: {
    searchParams: { page: number }
}) {

    //get level test questions
    const currentPage = Number(searchParams.page) || 1;
    let totalPages: number = 2;
    let tests: ToeicDataPublic = {
        id: 0,
        question: "",
        part: 0,
        image: "",
        sound: "",
        option: {
            id: 0,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        },
        take: false,
        answer: "",
        description: "",
        script: ""
    };

    const option: OptionData = {
        id: 1,
        choice1: 'to convince',
        choice2: 'to convince',
        choice3: 'to convince',
        choice4: 'to convince',
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.TOEIC}/find-types?page=${currentPage - 1}&size=1`, {
            method: 'GET',
            headers: CommonHeader,
            cache: 'no-store'
        })
        const data: I_ApiLevelTestResponse = await response.json();

        if (data) {
            totalPages = data.totalPages || 0;
            tests = data.questions;
        } else {
            console.error('Failed to get response data' + ERROR.SERVER_ERROR);
        }
    } catch (err) {
        console.log('Failed to get notice: ', ERROR.SERVER_ERROR);
    }

   
    return (<>
        <div className="bg-white w-screen h-screen">
            <div className="flex flex-row w-full p-3">
                <CloseBtn />
            </div>
            <div className="w-full flex justify-center">
                <div className="flex flex-col  w-[768px] h-screen">
                    <div className="p-2">
                        <div className="flex flex-row gap-x-2 items-center">
                            <LinkIcon size={30} />
                            <h1 className="text-black font-semibold text-2xl">토익두잇 레벨테스트</h1>
                        </div>
                        <div className="flex flex-col gap-y-7 mt-10">
                            <div className="text-black font-medium text-xl mt-5">Question 1</div>
                            <p className="text-black font-medium text-lg">Mr.Miller failed to convice the prospective investors to finally support the research and development phase of his invention</p>
                            <ToeicAnswer op={option} />
                        </div>

                        {/* <div className="mt-10">
                            <div className="w-full flex justify-end">
                                {Number(searchParams.page)===totalPages && 
                                <button 
                                onClick={()=>{}}
                                className="bg-blue-100 hover:bg-blue-50 text-black font-medium p-5 rounded-t-3xl rounded-bl-3xl"
                                >
                                    제출하기
                                </button>          
                                }
                            </div>
                        </div> */}

                    </div>
                    <div className="mt-10 flex w-full justify-end">
                        <CustomPagination totalPages={10} type={"single"} />
                    </div>
                </div>

            </div>

        </div>
    </>);
}