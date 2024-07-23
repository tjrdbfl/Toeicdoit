import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";

export const metadata = {
  title: "Toeicdoit - Payment Page",
};

export default function TXLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
    <Navbar/>
      <div className="w-full min-h-screen flex justify-center py-20 total_padding">
        {children}
      </div>
      <Footer/>
    </>

  );
}
