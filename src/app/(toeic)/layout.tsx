'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function ToeicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>

    );
}