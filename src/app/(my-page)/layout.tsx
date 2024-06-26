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
      <div className="flex flex-wrap lg:flex-row min-h-screen items-center justify-center xl:justify-between w-full h-full py-[10%] md:py-[10%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] bg-white lg:gap-x-10 md:gap-x-24 sm:gap-x-40 total_padding">
        <div className="xl:w-[15%] w-full">
            <div className="xl:mt-[10%]"/>
        <Sidebar/>
        </div>
        <div className="xl:w-[77%] 2xl:w-[81%] w-full">
        {children}
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
  