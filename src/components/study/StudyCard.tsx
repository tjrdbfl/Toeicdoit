'use client';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FrequentlyAskType } from "@/constants/study/constants";
import FAQ1 from "./FAQ1";

const StudyCard = ({ FAQ }: { FAQ: FrequentlyAskType }) => {
    const [open, setOpen] = useState(false);

    let contentList = FAQ.content?.split(' || ');

    return (<>
        <button
            className="bg-blue-50 hover:bg-blue-100 w-[650px] h-auto text-black text-[15px] font-semibold py-3 px-5 flex flex-col items-center shadow-lg z-10
                    rounded-xl"
            onClick={() => setOpen(!open)}
        >
            <div className="flex flex-row justify-between w-full">
                <p>{FAQ.title}</p>
                {open ? <KeyboardArrowUpIcon className="text-black text-3xl" />
                    : <KeyboardArrowDownIcon className="text-black text-3xl" />}
            </div>
            {open &&
                (FAQ.id === 1 ? <FAQ1 /> :
                <>
                    {contentList?.map((content) => (
                        <div 
                        key={FAQ.id}
                        className="flex flex-col justify-start w-full">
                            <p 
                            key={FAQ.id}
                            className="text-black font-normal text-[14px] text-start mt-2">
                                {content}
                            </p>
                        </div>

                    ))}
                </>)
            }
        </button>
    </>);
}
export default StudyCard;