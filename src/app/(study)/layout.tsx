import Footer from "../Footer";
import Navbar from "../Navbar";

export default function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="w-full min-h-screen h-auto py-28">
                    {children}
                </div>
                <Footer />
            </div>
        </>

    );
}
