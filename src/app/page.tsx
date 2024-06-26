import { Hero, About, Explore, GetStarted, WhatsNew, World, Review, Feedback,FooterStarted } from "@/templates/dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {

  return (
    <div className="">
      <Navbar/> 
        <div className="total_padding">      
      <div className="2xl:mt-[4%] xl:mt-[7%] lg:mt-[10%] sm:mt-[10%] md:mt-[15%] " />
      <Hero />

      <div className="mt-[7%]" />
      <About />

      <div className="absolute z-0" />
        <div className="mt-[7%]" />
        <WhatsNew />

        <div className="mt-[10%] lg:mt-[7%]" />
        <World />

      <div className="relative">
        <div className="mt-[7%]" />
        <div className="gradient-03 z-0" />
        <Explore />
      </div>

      <div className="relative">
      <div className="mt-[10%] lg:mt-[7%]" />
        <GetStarted />
      </div>
      <div className="mt-[7%]" />
      
      <div className="relative">
        <div className="mt-[7%]" />
        <Review />
      </div>
      
      <div className="mt-[7%]" />
      <FooterStarted/>
      </div>  
      <Footer />
      
    </div>
  );
}
