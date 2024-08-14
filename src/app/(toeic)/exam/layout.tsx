export const metadata = {
  title: "Toeicdoit - Exam Page",
  description: "",
};

export default function QuestionLayout({
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
