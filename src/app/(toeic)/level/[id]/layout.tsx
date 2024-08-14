
export const metadata = {
    title: "Toeicdoit - Level Practice Page",
    description: "",
};

export default function LevelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full h-screen">
            {children}
            </div>
        </>

    );
}
