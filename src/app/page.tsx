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
    <div className="">
      <div className="fixed bottom-5 right-5 z-40">
        <MoveToTopBtn />
      </div>
      <div className="fixed bottom-24 right-5 z-40">
        <ChatBtn />
      </div>
      <ChatContainer />

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

        <div className="mt-[7%] z-20" />
        <FooterStarted />
      </div>

    </div>
  );
}
