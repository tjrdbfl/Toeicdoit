'use client';

import { Suspense } from "react";
import LoadingPage from "../loading";
import { redirect } from "next/navigation";

export default function ChatPage() {

    // const cookieStore = cookies();
    // const token = cookieStore.get('token');
    // if (!token) {
    //   redirect('/login');
    // }

    redirect('/');
    
    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <div className="bg-white text-red-500 text-4xl p-10 border-slate-200 border-8 z-10">
                    OPENPAGE
                </div>
            </Suspense>
        </>
    );
}
