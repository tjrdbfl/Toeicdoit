'use client';
import { Dialog } from "@mui/material";
import { SetStateAction, useState } from "react";
import ToeicDescriptionModal from "./ToeicDescriptionModal";
import ToeicVideoModal from "./ToeicVideoModal";
import { ToeicProblemType } from "@/types/ToeicData";


const ToeicModalBtn = ({ id, label,toeic }: {
    id: number,
    label: string,
    toeic: ToeicProblemType,   
}) => {

    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);

    return (<>
        <button className="mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] p-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-80"
            onClick={() => id===1? setDescriptionOpen(true):setVideoOpen(true)}>
            {label}
        </button>
        <Dialog
            open={id===1? descriptionOpen:videoOpen}
            PaperProps={{
                sx:{borderRadius:5}
            }}
        >
        {id===1? 
        <ToeicDescriptionModal id={id}  setOpen={setDescriptionOpen} toeic={toeic}/>
        :<ToeicVideoModal id={id} label={""} setOpen={setVideoOpen}      
        />}  
        </Dialog>
    </>);
}
export default ToeicModalBtn;