import { Hero, About, Explore, GetStarted, WhatsNew, World, Review, Feedback, FooterStarted } from "@/templates/dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MoveToTopBtn from "@/components/button/MoveToTopBtn";
import ChatBtn from "@/components/button/ChatBtn";
import ChatContainer from "@/templates/chat/ChatContainer";
import ChatContentContainer from "@/templates/chat/ChatContentContainer";
import { findUserInfoById } from "@/service/auth/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: {
  searchParams: { roomId: string }
}) {

 
 return (
    <>
      <Navbar/>
      <div className="xl:px-[15%] 2xl:px-24">
        <div className="fixed bottom-5 right-5 z-40">
          <MoveToTopBtn />
        </div>
        <div className="fixed bottom-24 right-5 z-40">
          <ChatBtn />
        </div>
        <ChatContainer />
        {searchParams.roomId && <ChatContentContainer roomId={searchParams.roomId} />}
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
