import { useRouter } from 'next/router';

export default function ExamIdPage({ 
    params 
}: { 
    params: { id: number } 
}) {
    return (
        <>
            {params.id}
        </>
    );
}
export const generateStaticParams = async () => {
    const ids = ['1', '2', '3','4','5','6','7','8','9','10']; 

    return ids.map(id => ({
        params: {
            id
        }
    }));
};