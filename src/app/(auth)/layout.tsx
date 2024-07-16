import { getDecryptedUserData } from "@/store/auth/user-slice";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { store } from "@/redux";

export const metadata = {
  title: "Toeicdoit - Auth Page",
};

export default function AuthLayout({
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
      <div className="w-full">
        <Navbar userData={userData} />
        <div className="w-full flex justify-center items-center total_padding py-32">
          {children}
        </div>
        <Footer />
      </div>
    </>

  );
}
