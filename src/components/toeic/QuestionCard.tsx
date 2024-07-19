import { OptionData, OptionDataPublic, ToeicDataPublic } from "@/types/ToeicData";
import Image from "next/image";
import { FC } from "react";
import ToeicModalBtn from "./ToeicModalBtn";

interface QuestionCardProps {
    id:number,
    toeic: ToeicDataPublic;
}
const QuestionCard: FC<QuestionCardProps> = ({
    id,toeic   
}) => {

    return (<>
        <div
            key={id}
            className="flex flex-col justify-center">
            <div className="flex flex-row gap-x-2 mb-5 md:mx-6 lg:mx-12 xl:mx-0 md:pr-16 lg:pr-0">
                <h1
                    key="level practice number"
                    className="text-black text-xl text-pretty w-[40px]"
                >{id} . </h1>
                {toeic.question !== '' && <h2
                    key="level practice question"
                    className="text-black text-xl items-start">
                    {toeic.question}
                </h2>}
            </div>
            <div
                key="level practice image"
                className="mt-3">
                {toeic.image !== '' &&
                    <div className="2xl:mx-0 mb-10 object-fill w-[550px] xl:w-[600px]">
                        <Image
                            src={`/images/dashboard/planet-01.png`}
                            alt={"level practice image"}
                            width={500}
                            height={400}
                            priority={true}
                            className="w-[350px] lg:w-[500px]"
                        />
                    </div>
                }
            </div>

            <div className="md:mx-6 lg:mx-12 xl:mx-0">
                <div className="flex items-start mb-4">
                    <p
                        className={`ms-2 text-lg font-medium flex flex-row justify-start limited-width-text ${toeic.take && toeic.answer === 'a' ? 'text-red-500' : 'text-gray-900 '}`}>
                        <p className="text-nowrap mr-2">(a)</p>
                        {toeic.option.choice1}
                    </p>
                </div>

                <div className="flex items-start mb-4">

                    <p
                        className={`ms-2 text-lg font-medium flex flex-row justify-start limited-width-text ${toeic.take && toeic.answer === 'b' ? 'text-red-500' : 'text-gray-900 '}`}>
                        <p className="text-nowrap mr-2">(b)</p>
                        {toeic.option.choice2}
                    </p>
                </div>

                <div className="flex items-start mb-4">
                    <p
                        className={`ms-2 text-lg font-medium flex flex-row justify-start limited-width-text ${toeic.take && toeic.answer === 'c' ? 'text-red-500' : 'text-gray-900 '}`}>
                        <p className="text-nowrap mr-2">(c)</p>
                        {toeic.option.choice3}
                    </p>
                </div>

                {toeic.option.choice4 !== '' && <div className="flex items-start mb-4">
                    <p
                        className={`ms-2 text-lg font-medium flex flex-row justify-start limited-width-text ${toeic.take && toeic.answer === 'd' ? 'text-red-500' : 'text-gray-900 '}`}>

                        <p className="text-nowrap mr-2">(d)</p>
                        {toeic.option.choice4}
                    </p>
                </div>}
            </div>

            {toeic.take && <>
                <div className="flex flex-row gap-x-5 mt-5">
                    <ToeicModalBtn id={1} label={"해설 보기"} description={"toeic.description"} />
                    <ToeicModalBtn id={2} label={"ai 해설 강의 듣기"} />
                </div>
            </>}
        </div>
    </>);
}
export default QuestionCard;