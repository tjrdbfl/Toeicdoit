import LinkIcon from "@/components/common/LinkIcon";
import CardContainer from "@/templates/toeic/CardContainer";



export default async function LevelPage() {


    return (<>
        <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
            <div className="2xl:px-20">
            <div className="flex flex-row items-center gap-x-2">
                <LinkIcon size={30} />
                <h1 className="text-black font-medium text-start text-2xl xl:text-3xl">수준별 연습문제</h1>
            </div>
            <div className="mt-10" />
            <CardContainer />
            </div>
        </div>
    </>);
}
