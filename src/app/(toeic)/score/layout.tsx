export const metadata = {
    title: "Toeicdoit - Score Page",
    description: "",
};

export default function ScoreLayout({
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
