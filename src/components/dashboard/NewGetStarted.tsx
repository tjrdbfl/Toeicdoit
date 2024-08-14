import { styles } from "@/constants/styles/dashboard";
import Image from "next/image";
import LinkIcon from "../common/LinkIcon";

const NewGetStarted = ({ imgUrl, title, subtitle }: {
    imgUrl: string,
    title: string,
    subtitle: string
}) => (
    <div className="flex flex-row gap-x-10 mt-10 items-end">
       <Image loading="lazy"
                width={500}
                height={500}
                src={imgUrl}
                alt="icon"
                className="rounded-xl w-[500px] shadow-lg" />

        <div className="flex flex-col w-[800px]">
            <div className="flex flex-row items-center gap-x-2">
            <LinkIcon size={25}/>
            <h1 className="font-semibold text-[20px] leading-[30.24px] text-black text-balance">
                {title}
            </h1> 
            
            </div>
            <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px] text-balance">
                {subtitle}
            </p>

        </div>
    </div>
);

export default NewGetStarted;
