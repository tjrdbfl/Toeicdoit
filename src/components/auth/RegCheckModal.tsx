'use client';
import { check, checkServiceProvider, checkTermsContent, checkTermsTitle } from "@/constants/register/checkbox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ScrollArea, ScrollBar } from "../utils/ScrollArea";

const RegCheckModal = ({ id, label, setOpen }: {
    id: number,
    label: string,
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    return (<>
        <div className="bg-white p-3">
            <div className="flex flex-row justify-between items-center">
                <div className="text-[16px] font-semibold ml-2">{check[id].label}</div>

                <button
                    onClick={() => setOpen(false)}
                    className="hover:rounded-full hover:bg-slate-100 w-10 h-10">
                    <CloseIcon className="text-slate-400 text-xl" />
                </button>

            </div>
            <div className="border-slate-300 border-2 rounded-xl mt-5 p-5">
                <ScrollArea
                className="h-[600px] w-auto">
                    <div className="mr-5">
                    {checkTermsTitle.map((term) => (
                        <>
                            <div
                                key={term.id}
                                className="text-[15px] mb-2 text-balance">
                                {term.title}
                            </div>
                            {checkTermsContent.filter((content) => content.order === term.order)
                                .map((content) => (
                                    <div
                                        key={content.order}
                                        className="mb-2 text-balance text-[14px]">
                                        {content.content}
                                    </div>
                                ))}
                        </>
                    ))}
                    <div className="mt-5 text-balance text-[15px]">
                        [서비스 제공자]
                    </div>
                    </div>
                    <ScrollBar orientation="vertical"/>
                </ScrollArea>
            </div>
            
        </div>


    </>);
}
export default RegCheckModal;