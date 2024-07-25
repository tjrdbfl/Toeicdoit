'use client';

const ExamBody = ({ children, id }: {
    children: React.ReactNode,
    id: number,
}) => {

    return (<>
        <tr
            key={id}
            className="w-full border-b text-lg rounded-2xl"
        >
            {children}
        </tr>
    </>);
}
export default ExamBody;