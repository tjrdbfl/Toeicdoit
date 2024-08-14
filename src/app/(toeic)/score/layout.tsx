import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";

export const metadata = {
    title: "Toeicdoit - Score Page",
    description: "",
};

export default function ScoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <Navbar/>
            <div className="w-full">
                {children}
            </div>
        <Footer/>
        </>

    );
}
