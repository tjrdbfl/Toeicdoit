'use client';
import { PG } from "@/constants/enums/PG";
import { useExamRetakeModalStore, useExamCautionModalStore } from "@/store/toeic/store";
import { useRouter } from "next/navigation";

const RetakeModal=({id}:{id:number})=>{
    const {setShow}=useExamRetakeModalStore();
    const {toggleModal}=useExamCautionModalStore();
    const router=useRouter();

    return(<>
    <div className="bg-white p-3">
                <div className=" ml-2">토익두잇에서 이미 응시하신 시험입니다.</div>
                <div className=" ml-2">재응시하시겠습니까?</div>
                <div className="flex flex-row mt-5 justify-end">
                <button
                    onClick={setShow}
                    className="hover:rounded-full hover:bg-slate-100 w-13 h-13 p-2 text-blue-500 text-[15px]">
                    취소
                </button>
                <button
                    onClick={()=>{
                        useExamRetakeModalStore.setState({
                            show:false
                        });
                        toggleModal;
                        router.push(`${PG.EXAM}/${id}`)
                    }}
                    className="hover:rounded-full hover:bg-slate-100 w-13 h-13 p-2 text-blue-500 text-[15px]">
                    응시
                </button>
            </div>
            </div>
    </>);
}
export default RetakeModal;