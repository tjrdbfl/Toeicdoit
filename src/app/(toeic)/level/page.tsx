import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import LinkIcon from "@/components/common/LinkIcon";
import CardContainer from "@/templates/toeic/CardContainer";



export default async function LevelPage() {


    return (<>
    <Navbar/>
        <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[5%] total_padding">
            <div className="xl:px-24">
            <div className="flex flex-row items-center gap-x-2">
                <LinkIcon size={25} />
                <h1 className="text-black font-medium text-start text-xl xl:text-2xl">수준별 연습문제</h1>
            </div>
            <div className="mt-10" />
            <CardContainer />
            </div>
        </div>
        <Footer/>
    </>);
}
