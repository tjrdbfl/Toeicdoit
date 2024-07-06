"use client";
import { usePathname } from "next/navigation";


export default function Modal({ children }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <>
            {pathname === '/chat' &&
                <div
                    className="fixed inset-0 z-20 flex justify-center items-center"
                >
                    {children}
                </div>
            }
        </>
    );
}
