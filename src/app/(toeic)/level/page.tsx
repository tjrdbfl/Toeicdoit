import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import LinkIcon from "@/components/common/LinkIcon";
import MainHeader from "@/components/common/MainHeader";
import CardContainer from "@/templates/toeic/CardContainer";



export default async function LevelPage() {


    return (<>
    <Navbar/>
        <div className="min-h-screen w-full flex flex-col py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[5%] px-20 lg:px-40">
            <div className="xl:px-24">
            <MainHeader label={"수준별 연습문제"}/>
       
            <div className="mt-10" />
            <CardContainer />
            </div>
        </div>
        <Footer/>
    </>);
}
