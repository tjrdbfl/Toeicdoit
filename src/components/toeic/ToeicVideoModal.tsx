'use client';
import { check, checkServiceProvider, checkTermsContent, checkTermsTitle } from "@/constants/register/checkbox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ScrollArea, ScrollBar } from "../utils/ScrollArea";

const ToeicVideoModal = ({ id, label, setOpen }: {
    id: number,
    label: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
}) => {
    return (<>
    <div className="bg-white p-5">
            <div className="flex flex-row justify-between items-center">
                <div className="text-xl font-semibold ml-2">{check[id].label}</div>

                <button
                    onClick={() => setOpen(false)}
                    className="hover:rounded-full hover:bg-slate-100 w-10 h-10">
                    <CloseIcon className="text-slate-400 text-3xl" />
                </button>

            </div>
            <div className="border-slate-300 border-2 rounded-xl mt-5 p-5">
            <video
                width="85%"
                autoPlay
                muted
                preload="auto"
                playsInline
                loop
                className='h-[70%] pointer-events-none '
            >
                <source
                    src='/videos/main.mp4'
                    type="video/mp4"
                />
            </video>
            </div>
            
        </div>       
    </>);
}
export default ToeicVideoModal;