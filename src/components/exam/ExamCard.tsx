import {
  OptionData,
  OptionDataPublic,
  ToeicDataPublic,
} from "@/types/ToeicData";
import Image from "next/image";
import { FC } from "react";
import ToeicModalBtn from "../toeic/ToeicModalBtn";

interface ExamCardProps {
  id: number;
  take: boolean;
  question: string;
  image: string;
  option: OptionDataPublic;
  answer: string;
  part:number;
  //toeic: ToeicDataPublic;
}
const ExamCard: FC<ExamCardProps> = ({
  //toeic
  id,
  take,
  question,
  image,
  option,
  answer,
  part
}) => {
  return (
    <>
      <div key={id} className="flex flex-col justify-center mx-3">
        <div className="flex flex-row gap-x-2 mb-5 md:mx-6 lg:mx-12 xl:mx-0">
          <h1
            key="level practice number"
            className="text-black text-nowrap font-medium"
          >
            {id} .{" "}
          </h1>
          {question !== "" && (
            <h2
              key="level practice question"
              className="text-black items-start font-medium"
            >
              {question}
            </h2>
          )}
        </div>
        <div key="level practice ">
          {image !== "" && (
            <Image
              src={`${image}`}
              alt={"level practice image"}
              width={300}
              height={300}
              priority={true}
              className={`justify-center ${part!==6 && part!==7 ? 'w-[300px] h-[200px]':'w-[500px] h-[700px]'} `}
            />
          )}
        </div>

        <div className="md:mx-6 lg:mx-12 xl:mx-0 mt-4">
          <div className="flex items-start mb-3">
            <p
              className={`text-[15px] font-medium flex flex-row justify-start limited-width-text ${
                take && answer === "a" ? "text-red-500" : "text-gray-900 "
              }`}
            >
              <p className="text-nowrap mr-2">(a)</p>
              {option.choice1}
            </p>
          </div>

          <div className="flex items-start mb-3">
            <p
              className={`text-[15px] font-medium flex flex-row justify-start limited-width-text ${
                take && answer === "b" ? "text-red-500" : "text-gray-900 "
              }`}
            >
              <p className="text-nowrap mr-2">(b)</p>
              {option.choice2}
            </p>
          </div>

          <div className="flex items-start mb-3">
            <p
              className={`text-[15px] font-medium flex flex-row justify-start limited-width-text ${
                take && answer === "c" ? "text-red-500" : "text-gray-900 "
              }`}
            >
              <p className="text-nowrap mr-2">(c)</p>
              {option.choice3}
            </p>
          </div>

          {option.choice4 !== "" && (
            <div className="flex items-start mb-3">
              <p
                className={`text-[15px] font-medium flex flex-row justify-start limited-width-text ${
                  take && answer === "d" ? "text-red-500" : "text-gray-900 "
                }`}
              >
                <p className="text-nowrap mr-2">(d)</p>
                {option.choice4}
              </p>
            </div>
          )}
        </div>

        {take && (
          <>
            <div className="flex flex-row gap-x-5 mt-5">
              <ToeicModalBtn
                id={1}
                label={"해설 보기"}
                description={"toeic.description"}
              />
              <ToeicModalBtn id={2} label={"ai 해설 강의 듣기"} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ExamCard;
