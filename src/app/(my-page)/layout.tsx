import Sidebar from "@/components/my-page/Sidebar";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const metadata = {
    title: "Toeicdoit - My Page",
    description: "",
  };

export default function MyPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
      <div className="w-full">
        <Navbar/>
      <div className="flex flex-row items-center justify-between w-full h-full py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] bg-white lg:gap-x-10 md:gap-x-24 sm:gap-x-40 total_padding">
        <div className="w-[15%]">
            <div className="mt-[10%]"/>
        <Sidebar/>
        </div>
        <div className="w-[82%]">
        {children}
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
  