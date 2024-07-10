export const metadata = {
    title: "Toeicdoit - Level Test Page",
    description: "",
};
export default function LevelTestLayout({
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