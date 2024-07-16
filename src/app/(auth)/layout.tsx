import { getDecryptedUserData } from "@/store/auth/user-slice";
import { store } from "@/redux";

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
      <div className="w-full flex justify-center items-center total_padding py-32">
        {children}
      </div>
    </>

  );
}
