"use client";
import { usePathname, useSearchParams } from "next/navigation";


export default function Modal({ children }: {
    children: React.ReactNode
}) {
    const chat = useSearchParams().get('chat');

    return (
        <>
            {chat === 'true' &&
                <div
                    className="fixed inset-0 z-20 flex justify-end items-end mb-12 mr-24"
                >
                    {children}
                </div>
            }
        </>
    );
}
