'use client';

import { styles } from '@/constants/styles/dashboard';
import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';


const ExploreCard = ({ id, imgUrl, title, content, index, active, handleClick }: {
  id: string,
  imgUrl: string,
  title: string,
  content: string,
  index: number,
  active: string,
  handleClick: Dispatch<SetStateAction<string>>
}) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative m-1 ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[550px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer shadow-lg rounded-3xl border-slate-200 border-2`}
    onClick={() => handleClick(id)}
  >
    <Image loading="lazy"
      src={imgUrl}
      alt="TestImage"
      className="w-[800px] h-full object-cover rounded-[24px] p-5"
      width={400}
      height={400}
    />
    {active !== id ? (
      <h3 className="font-semibold text-[20px] text-[var(--blue2)] p-2 absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(172,216,255,0.5)] rounded-b-[24px]">
        <div
          className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
        >
          <Image loading="lazy"
            src="/svgs/dashboard/headset.svg"
            alt="headset"
            className="w-1/2 h-1/2 object-cover"
            width={2000}
            height={500}
          />
        </div>
        <p className="font-normal text-[16px] leading-[20.16px] text-[var(--blue2)] uppercase">
          Enter Toeicdoit
        </p>
        <h2 className="mt-[24px] font-semibold text-[24px] text-[var(--blue1)]">
          {title}
        </h2>
        <h4 className="mt-[24px] text-[20px] text-black">
          {content}
        </h4>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
