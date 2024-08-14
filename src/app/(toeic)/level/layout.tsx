export const metadata = {
    title: "Toeicdoit - Level Page",
    description: "",
};

export default function LevelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full">
                {children}
            </div>
        </>

    );
}
