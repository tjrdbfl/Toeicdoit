import Image from "next/image";

const LogoIcon = ({size}:{size:number}) => (
    <>
    <div className="mx-2">
        <Image loading="lazy"
            src="/svgs/header/bubble.svg"
            alt="headset"
            width={size}
            height={size}
        />
        </div>
    </>

)
export default LogoIcon;