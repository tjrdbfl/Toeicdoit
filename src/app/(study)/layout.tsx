import { getDecryptedUserData } from "@/store/auth/user-slice";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { store } from "@/redux";

export default async function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
        <Navbar/>
        <div className="w-full min-h-screen h-auto py-20 md:px-32">
            {children}
         
        </div> 
        <Footer/>
        </>
        
    );
}
