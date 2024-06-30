import ExamContainer from '@/templates/toeic/ExamContainer';

export default function ExamIdPage({ 
    params 
}: { 
    params: { id: number } 
}) {
    return (
        <>
         <ExamContainer id={params.id}/>
        </>
    );
}