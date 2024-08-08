'use client';
import { classifyPart, classifyQuestion, items } from "@/service/toeic/items";
import { useCallback, useEffect, useRef, useState } from "react";
import { allParts } from "@/constants/toeic/exam";
import ExamCard from "@/components/exam/ExamCard";
import { ToeicProblemType } from "@/types/ToeicData";

export default function ExamContainer({ toeicIds }: { toeicIds: ToeicProblemType[] }) {
  const [selectedTab, setSelectedTab] = useState(allParts[0].label);
  const partRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleTabClick = (label: string) => {
    setSelectedTab(label);
    const partRef = partRefs.current[label];
    if (partRef) {
      const yOffset = partRef.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  };

  const setPartRef = useCallback(
    (label: string) => (el: HTMLDivElement | null) => {
      partRefs.current[label] = el;
    },
    []
  );

  return (
    <>
      <div className="flex flex-wrap bg-zinc-100">
        <nav className="fixed top-24">
          <ul className="flex flex-row w-[900px]">
            {allParts.map((item) => (
              <li
                key={item.label}
                onClick={() => handleTabClick(item.label)}
                className={`cursor-pointer relative font-semibold bg-white border-slate-100 border-2 py-1 px-5 shadow-md
                       ${item.label === selectedTab
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600 after:transition-all after:duration-200"
                    : "text-black"
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {toeicIds.map((item, index) => {

          return (
            <div
              role="level practice"
              key={index}
              className="flex mt-16"
              ref={setPartRef(`${classifyQuestion(item.id)}`)}
            >
              <ExamCard
                key={item.id}
                toeic={item}
              />
            </div>
          );
        })}
      </div>


    </>
  );
}
