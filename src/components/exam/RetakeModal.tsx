import { useExamCautionModalStore, useExamRetakeModalStore } from '@/store/exam/store';

const RetakeModal=({id}:{id:number})=>{
    const {setShow}=useExamRetakeModalStore();
    const {toggleModal}=useExamCautionModalStore();

    return(<>
    <div className="bg-white p-6">
                <div className="text-xl ml-2">토익두잇에서 이미 응시하신 시험입니다.</div>
                <div className="text-xl ml-2">재응시하시겠습니까?</div>
                <div className="flex flex-row mt-5 justify-end">
                <button
                    onClick={setShow}
                    className="hover:rounded-full hover:bg-slate-100 w-13 h-13 p-2 text-blue-500 text-xl">
                    취소
                </button>
                <button
                    onClick={toggleModal}
                    className="hover:rounded-full hover:bg-slate-100 w-13 h-13 p-2 text-blue-500 text-xl">
                    응시
                </button>
            </div>
            </div>
    </>);
}
export default RetakeModal;