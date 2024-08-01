import Navbar from "../Navbar";
import Footer from "../Footer";

export const metadata = {
  title: "Toeicdoit - Auth Page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
    <Navbar userData={undefined}/>
      <div className="w-full min-h-screen flex justify-center items-center total_padding py-32">
        {children}
      </div>
      <Footer/>
    </>

  );
}
