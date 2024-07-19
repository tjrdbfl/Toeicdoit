import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import LinkIcon from "@/components/common/LinkIcon";
import PartCard from "@/components/toeic/PartCard";


export default async function PartPage() {



    return (<>
    <Navbar/>
        <div className="mx-auto flex flex-col justify-center py-[5%] md:py-[17%] lg:py-[15%] xl:py-[10%] 2xl:py-[5%] total_padding">
            <div className="2xl:px-20">
                <div className="flex flex-row items-center gap-x-2">
                    <LinkIcon size={25} />
                    <h1 className="text-black font-medium text-start text-xl xl:text-2xl">파트별 연습문제</h1>
                </div>
                <div className="mt-10" />
                <div className="flex flex-row">
                    <PartCard />
                </div>
            </div>
        </div>
        <Footer/>
    </>);

}