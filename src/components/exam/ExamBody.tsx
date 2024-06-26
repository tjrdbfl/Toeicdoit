'use client';

const ExamBody = ({ children, id }: {
    children: React.ReactNode,
    id: number,
}) => {

    return (<>
        <tr
            key={id}
            className="w-full border-b py-3 text-lg rounded-2xl hover:bg-slate-50"
        >
            {children}
        </tr>
    </>);
}
export default ExamBody;