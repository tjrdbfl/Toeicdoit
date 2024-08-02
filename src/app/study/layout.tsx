import Footer from "../Footer";
import Navbar from "../Navbar";

export default function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
        <Navbar/>
        <div className="w-screen min-h-screen h-auto py-20 md:px-32">
            {children}
         
        </div> 
        <Footer/>
        </>
        
    );
}
