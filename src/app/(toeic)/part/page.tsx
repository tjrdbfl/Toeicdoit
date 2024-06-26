import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import PartCard from "@/components/toeic/PartCard";

export default function PartPage() {

    return (<>
        <Navbar />
        <div className="mx-auto flex flex-col justify-center py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
            <h1 className="text-black font-medium text-start text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">파트별 연습문제</h1>
            <div className="mt-10" />

            <div className="flex flex-row">
                <PartCard/>
            </div>
        </div>
        <Footer />
    </>);

}