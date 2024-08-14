'use client';
import { check, checkServiceProvider, checkTermsContent, checkTermsTitle } from "@/constants/register/checkbox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ScrollArea, ScrollBar } from "../utils/ScrollArea";
import { ToeicProblemType } from "@/types/ToeicData";
import { splitStringToList } from "@/service/utils/utils";
import Image from "next/image";

const ToeicDescriptionModal = ({ id, setOpen,toeic }: {
    id: number,
    setOpen: Dispatch<SetStateAction<boolean>>,
    toeic:ToeicProblemType
}) => {
    console.log('ToeicDescriptionModal: '+toeic.description);
    
    return (<>
        <div className="bg-white p-5">
            <div className="flex flex-row justify-between items-center">
                <div className="text-lg font-semibold ml-2">{toeic.id}. {toeic.question}</div>
                <button
                    onClick={() => setOpen(false)}
                    className="hover:rounded-full hover:bg-slate-100 w-10 h-10">
                    <CloseIcon className="text-slate-400 text-3xl" />
                </button>
            </div>
            {toeic.image!=='' && <Image loading="lazy"
            src={toeic.image} 
            alt={"toeic_image"}
            width={300}
            height={200}/>}
            <div className="flex flex-col gap-y-2 mt-2">
            <p>{toeic.optionId.choice1}</p>
            <p>{toeic.optionId.choice2}</p>
            <p>{toeic.optionId.choice3}</p>
            <p>{toeic.optionId.choice4}</p>
            </div>
            
            <div className="border-slate-300 border-2 rounded-xl mt-5 p-5">
                
                <ScrollArea
                className="max-h-[300px] w-[500px]">
                    <div className="mr-5 flex flex-col gap-y-2">
                    {splitStringToList(toeic.description).map((term,index) => (
                       <div 
                       key={index}
                       className={`${index===0? 'font-semibold text-[17px]':''}`}>
                        {term}
                       </div>
                    ))}
                    </div>
                    <ScrollBar orientation="vertical"/>
                </ScrollArea>
            </div>
            
        </div>


    </>);
}
export default ToeicDescriptionModal;