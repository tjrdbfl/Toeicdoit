import Link from "next/link";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LevelCard = ({ id, description }: { id: number, description: string }) => {
    return (
        <li
            key={id}
            className="w-[330px] h-[230px] p-6 bg-white border-2 border-gray-100 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex flex-col">
            <h5 className="mb-5 text-lg font-bold tracking-tight text-[var(--blue2)]">Level {id}</h5>
            <p className="mb-5 font-normal text-gray-700 text-[15px] dark:text-gray-400">{description}</p>
            </div>
            <Link href={`/level/${id}`} className=" w-[170px] justify-between lime_button text-[14px]">
                Getting Started
                <ArrowForwardIcon/>
            </Link>
        </li>
    );
}

export default LevelCard;