import LevelCard from "@/components/toeic/LevelCard";
import { LevelCardContent } from "@/constants/toeic/level";

const CardContainer = () => {
    
    return (<>
        <ul 
        className="flex flex-wrap gap-x-5 gap-y-12 justify-between ">
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