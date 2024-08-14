import Sidebar from "@/components/my-page/Sidebar";
import "@/styles/my-page.css";
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
      <div className="w-full "> 
      <Navbar/>  
        <div className="px-10 lg:px-[10%] flex flex-row min-h-screen">
        <div className="flex flex-wrap lg:flex-row justify-center xl:justify-between w-full h-full bg-white lg:gap-x-10 md:gap-x-24 sm:gap-x-40 total_padding">
        <div className="xl:w-[15%] w-full">
          <div className="mt-20 xl:mt-40">
          <Sidebar/>
          </div>
        </div>
        <div className="xl:w-[77%] 2xl:w-[81%] w-full">
        {children}
        </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
  