export const metadata = {
    title: "Toeicdoit - Exam Page",
    description: "",
};

export default function LevelLayout({
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
