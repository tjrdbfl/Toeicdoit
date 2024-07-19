import { store } from "@/redux";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { getDecryptedUserData } from "@/store/auth/user-slice";

export const metadata = {
    title: "Toeicdoit - Notice Page",
    description: "",
};

export default function BoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="w-full">
            <Navbar/>
            <div className="min-h-screen">
            {children}
            </div>
            <Footer/>
        </div>
    );
}
