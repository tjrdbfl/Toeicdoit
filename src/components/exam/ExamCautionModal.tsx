import CloseIcon from '@mui/icons-material/Close';
import { ScrollArea, ScrollBar } from "../utils/ScrollArea";
import ModalCheckBox from '../common/ModalCheckBox';
import { useExamCautionModalStore } from '@/store/toeic/store';


const ExamCautionModal = ({ id,
}: {
    id: number,
}) => {

    const {toggleModal}=useExamCautionModalStore();
    
    return (<>
        <div className="bg-white p-3 w-[500px]">
            <div className="flex flex-row justify-between items-center">
                <div className="text-[16px] font-semibold ml-2">토익두잇 모의고사 주의사항</div>

                <button
                    onClick={toggleModal}
                    className="hover:rounded-full hover:bg-slate-100 w-10 h-10">
                    <CloseIcon 
                    className="text-slate-400 text-[16px]" 
                    />
                </button>

            </div>
            <div className="border-slate-300 border-2 rounded-xl mt-3 p-5">
                <ScrollArea
                    className="h-[450px] w-auto">
                    <div className="mr-5">
                       <h2
                       className="text-[var(--blue2)] text-[16px] font-medium"
                       >토익 실전 모의고사를 풀기 전에 다음 사항들을 꼭 확인하세요!
                       </h2>
                       <h3
                       className="text-red-500 text-[16px] mt-2"
                       >
                        ※ 토익두잇 모의고사는 LC 45분, RC 75분으로 배정되어 있으며, 두 파트 모두 100문제씩 제공됩니다.
                       </h3>
                       <p className="text-[14px] text-black font-medium mt-2">
                        토익 두잇을 통해 현실적인 모의고사 환경을 경험해보세요.
                        </p>
                        <p
                        className="text-[14px] text-black"
                        >- 저희 모의 시험은 실제 TOEIC 시험의 엄격한 시간 제한을 준수합니다. 즉, 듣기 및 이해(LC) 섹션에 45분, 읽기 및 이해(RC) 섹션에 75분이 할당되어 있습니다.</p>
                        <p
                        className="text-[14px] text-black"
                        >- 참고로, 제한 시간 이전에 제출아 가능합니다.</p>
                       <h3
                       className="text-red-500 text-[16px] mt-2"
                       >
                        ※무단 캡처 금지
                       </h3>
                        <p className="text-[14px] text-black font-medium mt-2">
                        1. 저작권 보호  
                        </p>
                        <p
                        className="text-[14px] text-black"
                        >- 모든 토익 모의고사 문제 및 답안은 저작권 보호 대상입니다.</p>
                        <p
                        className="text-[14px] text-black"
                        >- 무단 캡쳐, 복제, 배포, 공유는 저작권 침해에 해당하며 법적 책임을 질 수 있습니다.</p>
                        <p className="text-[14px] text-black font-medium mt-2">
                        2. 콘텐츠 제작자의 노력 존중  
                        </p>
                        <p
                        className="text-[14px] text-black"
                        >- 토익 모의고사 제작자들은 문제 개발, 답안 작성, 플랫폼 구축에 많은 시간과 노력을 투자합니다.</p>
                        <p
                        className="text-[14px] text-black"
                        >- 무단 캡쳐는 제작자들의 노력을 헛되게 만들고, 수익 기회를 감소시킬 수 있습니다.</p>
                        <p className="text-[14px] text-black font-medium mt-2">
                        3. 공정한 시험 환경 유지  
                        </p>
                        <p
                        className="text-[14px] text-black"
                        >- 무단으로 캡쳐된 모의고사 문제 및 답안이 유출되면, 시험의 공정성이 훼손될 수 있습니다.</p>
                        <p
                        className="text-[14px] text-black"
                        >- 다른 사용자들의 학습 기회를 저해하고, 불공평한 경쟁을 초래할 수 있습니다.</p>
                       
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
                </div>
                <div className='flex flex-row mt-2'>
                <ModalCheckBox id={id}/>
                <p className='text-black text-[14px] mt-3'>위 사항을 숙지하였습니다.</p>
            </div>

        </div>

    </>);
}
export default ExamCautionModal;