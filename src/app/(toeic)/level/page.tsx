import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import LoadingPage from "@/app/loading";
import CardContainer from "@/templates/toeic/CardContainer";



const LevelPage = () => {
    return (<> 
        <Navbar />
        <div className="w-full flex flex-col px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
        <h1 className="text-black font-medium text-start text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">수준별 연습문제</h1>
            <div className="mt-10" />
            <CardContainer />
        </div>
        <Footer />
    </>);
}
export default LevelPage;