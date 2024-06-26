import Link from "next/link";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LevelCard = ({ id, description }: { id: number, description: string }) => {
    return (
        <li
            key={id}
            className="max-w-[400px] h-[300px] p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md flex flex-col justify-between">
            <h5 className="mb-5 text-2xl font-bold tracking-tight text-[#5AB2FF]">Level {id}</h5>
            <p className="mb-5 font-normal text-gray-700 text-lg dark:text-gray-400">{description}</p>
            <Link href={`/level/${id}`} className=" w-[185px] justify-between lime_button">
                Getting Started
                <ArrowForwardIcon/>
            </Link>
        </li>
    );
}

export default LevelCard;