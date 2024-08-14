import { styles } from "@/constants/styles/dashboard";
import Image from "next/image";

const NewFeatures = ({ imgUrl, title, subtitle }: {
  imgUrl: string,
  title: string,
  subtitle: string
}) => (
  <div className="flex-1 flex flex-col sm:max-w-[400px] min-w-[210px] md:mx-[20px] ">
    <div
      className={`${styles.flexCenter} w-[130px] h-[130px] rounded-[24px] object-cover sm:mt-[30px] lg:mt-0`}
    >
      <Image loading="lazy"
        width={500}
        height={400}
        src={imgUrl}
        alt="icon"
        className="object-contain rounded-3xl" />
    </div>
    <h1 className="mt-[26px] font-semibold text-[20px] leading-[30.24px] text-black text-balance">
      {title}
    </h1>
    <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px] text-balance">
      {subtitle}
    </p>
  </div>
);

export default NewFeatures;
