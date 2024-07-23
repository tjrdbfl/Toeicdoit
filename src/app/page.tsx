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
import { AuthorizeHeader } from "@/config/headers";

export default async function Home() {
  
  const cookieStore=cookies();
   
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`,{
      method:'GET',
      headers:AuthorizeHeader(cookieStore.get('accessToken')?.value),
      cache:'no-store'
    });

    const result=await response.json();
    console.log(result);

  }catch(err){
    console.log('home'+err);
  }
  
  return (
    <>
    <Navbar userData={null} />
    <div className="xl:px-[15%] 2xl:px-24">
      <div className="fixed bottom-5 right-5 z-40">
        <MoveToTopBtn />
      </div>
      <div className="fixed bottom-24 right-5 z-40">
        <ChatBtn />
      </div>
      <ChatContainer />

      <div className="total_padding">
        <div className="mt-5" />
        <Hero />
        <About />

        <div className="relative">

          <div className="gradient-03 z-0" />
          <div className="xl:px-20">
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
          <div className="mt-10">
          <Review />
          </div>
          </div>

        <div className="mt-[7%] z-20" />
        <FooterStarted />
      </div>
      <Footer />
    </div>
    </>
  );
}
