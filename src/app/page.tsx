'use server';
import { Hero, About, Explore, GetStarted, WhatsNew, World, Review, Feedback, FooterStarted } from "@/templates/dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MoveToTopBtn from "@/components/button/MoveToTopBtn";
import ChatBtn from "@/components/button/ChatBtn";
import ChatContainer from "@/templates/chat/ChatContainer";
import { cookies } from "next/headers";
import { MessageData } from "@/types/MessengerData";
import { ChatRoomData, Messenger } from "@/types/ChatData";

export default async function Home() {
  
  const cookieStore=cookies();
  let chatRoom:ChatRoomData[]=[];
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/api/room/find-all`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${cookieStore.get('accessToken')?.value}`
      },
      cache:'no-store'
    });

    const result:Messenger=await response.json();
    chatRoom=result.data as ChatRoomData[];

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
