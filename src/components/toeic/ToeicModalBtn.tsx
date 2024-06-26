'use client';
import { Dialog } from "@mui/material";
import { SetStateAction, useState } from "react";
import ToeicDescriptionModal from "./ToeicDescriptionModal";
import ToeicVideoModal from "./ToeicVideoModal";

const ToeicModalBtn = ({ id, label,description,script }: {
    id: number,
    label: string,
    description?:string;
    script?:string;
}) => {

    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);

    return (<>
        <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-80"
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
        <ToeicDescriptionModal id={id} label={""} setOpen={setDescriptionOpen} description={description||''}/>
        :<ToeicVideoModal id={id} label={""} setOpen={setVideoOpen} script={script||''}        
        />}  
        </Dialog>
    </>);
}
export default ToeicModalBtn;