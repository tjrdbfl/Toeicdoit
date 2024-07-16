import Sidebar from "@/components/my-page/Sidebar";

import Navbar from "../Navbar";
import Footer from "../Footer";
import "@/styles/my-page.css";
import { store } from "@/redux";
import { getDecryptedUserData } from "@/store/auth/user-slice";

export const metadata = {
    title: "Toeicdoit - My Page",
    description: "",
  };

export default function MyPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    console.log('rootState');
    const rootState = store.getState();

    const userData = getDecryptedUserData(rootState.user);
    console.log('userData: ', userData);

    return (
      <div className="w-full">
        <Navbar userData={null}/>
      <div className="flex flex-wrap lg:flex-row min-h-screen justify-center xl:justify-between w-full h-full py-[14%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] bg-white lg:gap-x-10 md:gap-x-24 sm:gap-x-40 total_padding">
        <div className="xl:w-[15%] w-full">
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
  