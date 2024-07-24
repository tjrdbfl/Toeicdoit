import { PG } from "@/constants/enums/PG";
import Link from "next/link";
import LinkIcon from "../common/LinkIcon";

const FAQ1 = () => {
    return (<>
        <div className="flex flex-col">
            <p className="text-black text-[14px] font-normal w-full text-start mt-5">
                토익두잇은 레벨테스트의 결과를 기반으로 레벨 1부터 레벨 9까지 100점 단위로 나누어 사용자의 학습 목표 설정과 맞춤형 학습 콘텐츠 제공에 도움을 줄 수 있습니다.
            </p><br />
            <div className="flex flex-row gap-x-2 items-center">
                <LinkIcon size={16} />
                <p className="text-black font-semibold text-[14px] w-full text-start">
                    레벨
                </p>
            </div>

            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 1: 0 ~ 199점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 2: 200 ~ 299점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 3: 300 ~ 399점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 4: 400 ~ 499점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 5: 500 ~ 599점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 6: 600 ~ 699점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 7: 700 ~ 799점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 8: 800 ~ 899점
            </p>
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 9: 900 ~ 990점
            </p><br />
            <p className="text-black font-normal text-[14px] w-full text-start">
                레벨 테스트는 사용자가 원하는 만큼 자유롭게 응시할 수 있으며, 테스트 결과에 따라 레벨이 변경될 수 있습니다. 이를 통해 사용자는 자신의 실력 변화를 확인하고, 그에 맞는 학습 콘텐츠를 추천받아 효율적인 학습을 이어갈 수 있습니다.
            </p><br />
            <div className="flex flex-row gap-x-2 items-center">
                <LinkIcon size={20} />
                <p className="text-black font-semibold text-[14px] text-start">
                    아직 레벨 테스트를 안 해보셨나요?
                </p>
                <Link
                    href={`${PG.LEVEL_TEST}`}
                    className="underline hover:text-blue-700 text-blue-500 text-[14px] w-[300px] ml-5 flex justify-start"
                >
                    레벨 테스트 하러가기
                </Link>
            </div>

        </div>
    </>);
}
export default FAQ1;