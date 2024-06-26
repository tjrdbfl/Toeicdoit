import QuestionContainer from "@/templates/toeic/QuestionContainer";

export default async function LevelPracticePage({ params }: {
    params: {
        id: number;
        page?: string;
    }
}) {

    

    return (<>
        <QuestionContainer id={params.id}/>
    </>);
}