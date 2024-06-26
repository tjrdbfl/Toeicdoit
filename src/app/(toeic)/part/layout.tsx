export const metadata = {
    title: "Toeicdoit - Part Page",
    description: "",
};

export default function PartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full min-h-screen">
                {children}
            </div>
        </>

    );
}
