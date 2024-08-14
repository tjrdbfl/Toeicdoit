"use client";
import { Dispatch, SetStateAction, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const CustomerFAQCard = ({
  id,
  category,
  question,
  answer,
}: {
  id: number;
  category: string;
  question:string;
  answer: string;
}) => {

  const [answerOpen,setAnswerOpen]=useState<boolean>(false);

  return (
    <>
      <button
        className="w-full p-5 text-black flex flex-col items-center border-b-slate-200 border-b-2"
        onClick={() => setAnswerOpen(!answerOpen)}
      >

        <div className="flex flex-row justify-between w-full">
        <div
          key={id}
          className="flex flex-row gap-x-10 w-full items-center px-5"
        >
          <p className="text-[16px] font-semibold">Q</p>
          <p className="text-[12px] lg:text-[14px] w-[130px] text-start">{category}</p>
          <p className="text-[12px] lg:text-[14px] text-start">{question}</p>
        </div>
        {answerOpen ? (
            <KeyboardArrowUpIcon className="text-black text-3xl" />
          ) : (
            <KeyboardArrowDownIcon className="text-black text-3xl" />
          )}
         
        </div>
        {answerOpen && (
           <div
           key={id}
           className="flex flex-row justify-between gap-x-52 w-full items-start mt-5 pt-8 pb-3 px-5 border-t-slate-100 border-t-2"
         >
           <p className="text-[16px] text-red-500 text-start font-semibold">A</p>
           <p className="text-[12px] lg:text-[14px] text-start text-pretty">{answer}</p>
         </div>
        )}
      </button>
    </>
  );
};
export default CustomerFAQCard;
