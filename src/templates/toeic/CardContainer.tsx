import LevelCard from "@/components/toeic/LevelCard";
import { LevelCardContent } from "@/constants/toeic/level";

const CardContainer = () => {
    
    return (<>
        <ul 
        className="flex flex-wrap justify-between gap-y-10">
            {LevelCardContent.map((card) => (
                <LevelCard 
                key={card.id}
                id={card.id} 
                description={card.description} />
            ))}
        </ul>
    </>);
}
export default CardContainer;