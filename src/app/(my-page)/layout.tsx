import Sidebar from "@/components/my-page/Sidebar";
import "@/styles/my-page.css";


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
      <div className="w-full min-h-screen">   
        <div className="2xl:px-[10%] flex flex-row">
        <div className="flex flex-wrap lg:flex-row min-h-screen justify-center xl:justify-between w-full h-full py-[14%] lg:py-[15%] xl:py-[13%] 2xl:py-[7%] bg-white lg:gap-x-10 md:gap-x-24 sm:gap-x-40 total_padding">
        <div className="xl:w-[15%] w-full">
          <div className="xl:mt-10">
          <Sidebar/>
          </div>
        </div>
        <div className="xl:w-[77%] 2xl:w-[81%] w-full">
        {children}
        </div>
        </div>
      </div>
      </div>
    );
  }
  