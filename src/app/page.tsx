'use server';
import { Hero, About, Explore, GetStarted, WhatsNew, World, Review, Feedback, FooterStarted } from "@/templates/dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MoveToTopBtn from "@/components/button/MoveToTopBtn";
import ChatBtn from "@/components/button/ChatBtn";
import ChatContainer from "@/templates/chat/ChatContainer";
import { store } from "@/redux";
import { getDecryptedUserData } from "@/store/auth/user-slice";
import { cookies } from "next/headers";
import { IUser } from "@/store/auth/user-model";

export default async function Home() {
  
  
  
  return (
    <div className="xl:px-[15%] 2xl:px-24">
      <div className="fixed bottom-5 right-5 z-40">
        <MoveToTopBtn />
      </div>
      <div className="fixed bottom-24 right-5 z-40">
        <ChatBtn />
      </div>
      <ChatContainer />

      <div className="total_padding">
        <div className="xl:mt-20 lg:mt-[10%] sm:mt-[10%] md:mt-[15%] " />
        <Hero />

        <div className="2xl:mt-5" />
        <About />

        <div className="relative">
          <div className="mt-5" />
          <div className="gradient-03 z-0" />
          <div className="xl:px-32">
          <Explore />
          </div>
          </div>
        
        <div className="mt-10 xl:px-32">
        <WhatsNew />
        </div>
        
        <div className="mt-20 px-32" >
        <World />
        </div>
        
        <div className="relative">
          <div className="mt-10 xl:px-32" >
          <GetStarted />
          </div>
          </div>
        <div className="mt-[7%]" />

        <div className="relative">
          <div className="mt-10 xl:px-32">
          <Review />
          </div>
          </div>

        <div className="mt-[7%] z-20" />
        <FooterStarted />
      </div>

    </div>
  );
}
