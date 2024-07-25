'use client';

import { Dialog } from "@mui/material";
import RetakeModal from "../exam/RetakeModal";
import { useExamRetakeModalStore } from "@/store/toeic/store";

const CompleteBtn = ({ id }: {
    id: number,
}) => {

    const {show,setShow}=useExamRetakeModalStore();
    
    return (<>
        <button
            className="text-emerald-500 underline text-[15px] hover:text-emerald-400"
            onClick={setShow}
        >
            응시완료
        </button>
        <Dialog
            open={show}
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <RetakeModal id={id}/>
        </Dialog>
    </>);
}
export default CompleteBtn;