import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { cookies } from 'next/headers';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans_KR({
    preload: false,
    style: 'normal',
});

export default function ChatLayout({
    children, modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {

    const cookieStore = cookies();
    const token: RequestCookie | undefined = cookieStore.get('token');

    return (
        <html lang="en">

            <body className={`${inter.className} ${notoSans.className}`}>

                <div className="bg-white overflow-hidden">

                    {modal}
                    {children}

                </div>
                {/* <CustomModal /> */}
            </body>
        </html>
    );
}
