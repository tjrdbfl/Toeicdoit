import Image from "next/image";

const LinkIcon=({size}:{size:number})=>(
    <>
    <div className="">
        <Image loading="lazy"
            src="/svgs/header/bubble_icon.svg"
            alt="headset"
            width={size}
            height={size}
        />
        </div>
    </>
);
export default LinkIcon;