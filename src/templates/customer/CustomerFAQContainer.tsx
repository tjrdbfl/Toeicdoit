"use client";
import { classifyPart, classifyQuestion, items } from "@/service/toeic/items";
import { SetStateAction, useCallback, useRef, useState } from "react";
import { allParts } from "@/constants/toeic/exam";
import {
  CustomerFAQCategory,
  CustomerFAQPart,
} from "@/constants/customer/constant";
import CustomerFAQCard from "@/components/customer/CustomerFAQCard";
import CustomPagination from "@/components/common/CustomPagination";

export default function CustomerFAQContainer({ page }: { page: number }) {
  const [selectedTab, setSelectedTab] = useState<number>(
    CustomerFAQCategory[0].id
  );

  let totalPages: number = 0;
  CustomerFAQPart.map((item) => {
    totalPages += item.content.length;
  });

  return (
    <>
      <div className="flex flex-wrap">
        <nav className="">
          <ul className="flex flex-row w-[900px]">
            {CustomerFAQCategory.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedTab(item.id)
                }}
                className={`cursor-pointer relative font-medium text-[12px] lg:text-[14px] text-center w-[130px] lg:w-[150px] py-2 shadow-md
                       ${
                         item.id === selectedTab
                           ? "bg-black text-white after:h-1  "
                           : "text-black bg-white"
                       }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-zinc-800 w-full h-[0.5px] mt-5" />
        {selectedTab === 0
          ? CustomerFAQPart.map((part) => {
              return (
                <>
                  {part.content
                    .filter(
                      (item) =>
                        item.id >= (page - 1) * 7 + 1 && item.id <= page * 7
                    )
                    .map((item, index) => {
                      return (
                        <CustomerFAQCard
                          key={index}
                          id={index}
                          category={part.label}
                          question={item.question}
                          answer={item.answer}
                        />
                      );
                    })}
                </>
              );
            })
          : CustomerFAQPart[selectedTab - 1].content.map((item, index) => (
              <CustomerFAQCard
                key={index}
                id={index}
                category={CustomerFAQPart[selectedTab - 1].label}
                question={item.question}
                answer={item.answer}
              />
            ))}
      </div>

      <div className="flex justify-center mt-5">
        <CustomPagination
          type="double"
          totalPages={selectedTab === 0
            ? totalPages % 7 === 0
              ? totalPages / 7
              : totalPages / 7 + 1
            : CustomerFAQPart[selectedTab - 1].content.length % 7 === 0
              ? CustomerFAQPart[selectedTab - 1].content.length / 5
              : CustomerFAQPart[selectedTab - 1].content.length / 7 + 1} 
              page={page}        />
      </div>
    </>
  );
}
