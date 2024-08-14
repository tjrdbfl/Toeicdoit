import { styles } from "@/constants/styles/dashboard";
import Image from "next/image";

const StudyRecipeCard = ({
  imgUrl,
  title,
  content,
}: {
  imgUrl: string;
  title: string;
  content: string;
}) => {
  return (
    <>
      <div
        className={`relative mt-5 xl:mr-20 flex-[10] flex items-center justify-center h-[450px] shadow-lg rounded-3xl border-slate-50 border-2`}
      >
        <Image loading="lazy"
          src={imgUrl}
          alt="TestImage"
          className="w-[300px] h-full rounded-[24px] opacity-60"
          width={300}
          height={250}
        />
        <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(172,216,255,0.3)] rounded-[24px]">
          <div
            className={`${styles.flexCenter} w-[50px] h-[50px] rounded-[16px] glassmorphism mb-[16px]`}
          >
            <Image loading="lazy"
              src="/svgs/dashboard/headset.svg"
              alt="headset"
              className="w-1/2 h-1/2 object-cover"
              width={2000}
              height={500}
            />
          </div>
          <p className="font-semibold text-[16px] leading-[20.16px] text-black">
            {title}
          </p>
          <h4 className="mt-[16px] text-[14px] text-zinc-500 font-medium">
            {content}
          </h4>
        </div>
      </div>
    </>
  );
};
export default StudyRecipeCard;
