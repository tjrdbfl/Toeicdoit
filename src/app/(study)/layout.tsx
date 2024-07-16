import { getDecryptedUserData } from "@/store/auth/user-slice";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { store } from "@/redux";

export default async function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log('rootState');
    const rootState = store.getState();

    const userData = getDecryptedUserData(rootState.user);
    console.log('userData: ', userData);

    return (
        <>
            <div className="w-full flex flex-col">
                <Navbar userData={userData} />
                <div className="w-full min-h-screen h-auto py-28">
                    {children}
                </div>
                <Footer />
            </div>
        </>

    );
}
