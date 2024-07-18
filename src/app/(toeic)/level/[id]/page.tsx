'use server';
import QuestionContainer from "@/templates/toeic/QuestionContainer";

export default async function LevelPracticePage({ params }: {
    params: {
        id: number;
        page?: string;
    }
}) {

    

    return (<>
        <div className="w-full lg:px-[7%] xl:px-[10%] 2xl:px-[20%] flex justify-center">
        <QuestionContainer id={params.id}/>
        </div>
    </>);
}