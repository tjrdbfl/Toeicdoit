'use client';

import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';


const ReviewCard = ({ imgUrl, title, subtitle, index, username, identity, hashtag }: {
  imgUrl: string,
  title: string,
  subtitle: string,
  index: number,
  username: string,
  identity: string,
  hashtag: string
}) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.3, 1)}
    className="my-5"
  >
    <div className='border-[3px] rounded-2xl border-slate-300 p-7 flex flex-col justify-between w-full 2xl:w-[600px] 2xl:h-[450px]'>
      <div className='flex flex-row'>
        <div
          className="md:w-[100px] w-[100px] h-[100px] rounded-full object-cover mr-[20px] lg:mr-[8px]"
        >
          <Image loading="lazy"
            src={imgUrl}
            alt="planet-01"
            width={1600} 
            height={500} 
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex-1 md:ml-[40px] flex flex-col max-w-[650px]">
            <div>
              <div className='text-[var(--blue2)] text-xl font-semibold lg:ml-[1%] '>{username} 님</div>
            </div>
            <div className='text-black text-lg font-medium lg:ml-[1%] mt-[3%] '>{identity}</div>
          </div>
        </div>
      </div>

      <h4 className="text-[20px] text-black font-semibold mt-[5%] text-balance ">
        {title}
      </h4>
      <p className="mt-[16px] font-normal text-[16px] text-black text-balance ">
        {subtitle}
      </p>
      <div className='text-blue-500 mt-[3%] text-[16px]'>{hashtag}</div>


    </div>
  </motion.div>
);

export default ReviewCard;
