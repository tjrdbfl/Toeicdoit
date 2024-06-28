import Footer from "../Footer";
import Navbar from "../Navbar";

export default function BoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="w-full min-h-screen h-auto">
                    {children}
                </div>
                <Footer />
            </div>
        </>

    );
}
