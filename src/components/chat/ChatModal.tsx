"use client";
import { usePathname, useSearchParams } from "next/navigation";


export default function ChatModal({ children }: {
    children: React.ReactNode
}) {
    const roomId = useSearchParams().get('roomId');

    return (
        <>
            {roomId &&
                <div
                className="fixed inset-0 z-20 flex justify-end items-end mb-20 mr-60"
                >
                    {children}
                </div>
            }
        </>
    );
}
