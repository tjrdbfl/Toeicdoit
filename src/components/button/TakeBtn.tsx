'use client';

import { Dialog } from "@mui/material";
import RealTestCautionModal from "../exam/ExamCautionModal";
import { useExamCautionModalStore } from "@/store/exam/store";

const TakeBtn = ({ id }: {
    id: number,
}) => {

    const { toggle, toggleModal } = useExamCautionModalStore();

    return (<>
        <button
            className="text-[#5AB2FF] underline text-lg hover:text-[#89CFF3]"
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