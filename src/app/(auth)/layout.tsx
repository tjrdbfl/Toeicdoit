import Footer from "../Footer";
import Navbar from "../Navbar";

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
      <div className="w-full">
        <Navbar/>
      <div className="w-full flex justify-center items-center total_padding py-32">
        {children}
      </div>
      <Footer/>
      </div>
    </>

  );
}
