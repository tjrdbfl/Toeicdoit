'use client';

import { Dialog } from "@mui/material";
import RealTestCautionModal from "../exam/ExamCautionModal";
import { useExamCautionModalStore } from "@/store/toeic/store";


const TakeBtn = ({ id }: {
    id: number,
}) => {

    const { toggle, toggleModal } = useExamCautionModalStore();

    return (<>
        <button
            className="text-[var(--blue2)] underline text-[15px] hover:text-[#89CFF3]"
            onClick={toggleModal}
        >
            응시하기
        </button>
        <Dialog
            open={toggle}
            PaperProps={{
                sx: {
                    borderRadius: 5,
                }
            }}
        >
            <RealTestCautionModal id={id} />
        </Dialog>
    </>);
}
export default TakeBtn;