import { OptionData, OptionDataPublic, ToeicDataPublic } from "@/types/ToeicData";
import Image from "next/image";
import { FC } from "react";
import ToeicModalBtn from "./ToeicModalBtn";

interface QuestionCardProps {
    id:number;
    take:boolean;
    question:string;
    image:string;
    option:OptionDataPublic;
    answer:string;
    //toeic: ToeicDataPublic;
    onSelect: (id: number, answer: string) => void;
}
const QuestionCard: FC<QuestionCardProps> = ({
    //toeic
    id,take,question,image,option,answer
    , onSelect
}) => {

    return (<>
        <div
            key={id}
            className="flex flex-col place-items-center justify-center my-7 md:px-0 lg:px-10 xl:px-36 2xl:my-7">
            <div className="flex flex-row  gap-x-2 mb-5 md:mx-6 lg:mx-12 xl:mx-0">
                <h1
                    key="level practice number"
                    className="text-black text-2xl text-nowrap"
                >{id} . </h1>
                {question !== '' && <h2
                    key="level practice question"
                    className="text-black text-2xl items-start">
                    {question}
                </h2>}
            </div>
            <div
                key="level practice image"
                className="mt-3">
                {image !== '' &&
                    <div className="2xl:mx-0 mb-10 object-cover w-[550px] lg:w-[600px]">
                        <Image
                            src={`${image}`}
                            alt={"level practice image"}
                            width={600}
                            height={300}
                            priority={true}
                            className=" justify-center"
                        />
                    </div>
                }
            </div>

            <div className="md:mx-6 lg:mx-12 xl:mx-0">
                <div className="flex items-start mb-4">
                    <input
                        id={`a-${id}`}
                        type="radio"
                        value="a"
                        name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={() => onSelect(id, 'a')}
                    />

                    <label
                        htmlFor={`a-${id}`}
                        className={`ms-2 text-xl font-medium flex flex-row justify-start limited-width-text ${take && answer==='a' ?'text-red-500':'text-gray-900 '}`}>
                        <p className="text-nowrap mr-2">(a)</p>
                        {option.choice1}
                    </label>
                </div>

                <div className="flex items-start mb-4">
                    <input
                        id={`b-${id}`}
                        type="radio"
                        value="b"
                        name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 "
                        onChange={() => onSelect(id, 'b')} /
                    >
                    <label
                        htmlFor={`b-${id}`}
                        className={`ms-2 text-xl font-medium flex flex-row justify-start limited-width-text ${take && answer==='b' ?'text-red-500':'text-gray-900 '}`}>
                        
                        <p className="text-nowrap mr-2">(b)</p>
                        {option.choice2}
                    </label>
                </div>

                <div className="flex items-start mb-4">
                    <input
                        id={`c-${id}`}
                        type="radio"
                        value="c"
                        name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 "
                        onChange={() => onSelect(id, 'c')}
                    />
                    <label
                        htmlFor={`c-${id}`}
                        className={`ms-2 text-xl font-medium flex flex-row justify-start limited-width-text ${take && answer==='c' ?'text-red-500':'text-gray-900 '}`}>
                        
                        <p className="text-nowrap mr-2">(c)</p>
                        {option.choice3}
                    </label>
                </div>
                <div className="flex items-start mb-4">
                    <input
                        id={`d-${id}`}
                        type="radio"
                        value="d"
                        name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 "
                        onChange={() => onSelect(id, 'd')} />
                    <label
                        htmlFor={`d-${id}`}
                        className={`ms-2 text-xl font-medium flex flex-row justify-start limited-width-text ${take && answer==='d' ?'text-red-500':'text-gray-900 '}`}>
                        
                        <p className="text-nowrap mr-2">(d)</p>
                        {option.choice4}
                    </label>
                </div>
            </div>

            {take && <>
                <div className="flex flex-row gap-x-5 mt-5">
                    <ToeicModalBtn id={1} label={"해설 보기"} description={"toeic.description"} />
                    <ToeicModalBtn id={2} label={"ai 해설 강의 듣기"} />
                </div>
            </>}
        </div>
    </>);
}
export default QuestionCard;