'use client';
import { Dialog } from "@mui/material";
import { SetStateAction, useState } from "react";
import RegCheckModal from "./RegCheckModal";

const RegCheckModalBtn = ({ id, label }: {
    id: number,
    label: string
}) => {
    const [open, setOpen] = useState(false);

    return (<>
        <button className="text-[14px] text-slate-500 font-medium underline hover:text-slate-400"
            onClick={() => setOpen(true)}>
            {label}
        </button>
        <Dialog
            open={open}
            PaperProps={{
                sx:{borderRadius:5}
            }}
        >
         <RegCheckModal id={id} label={label} setOpen={setOpen}/>   
        </Dialog>
    </>);
}
export default RegCheckModalBtn;