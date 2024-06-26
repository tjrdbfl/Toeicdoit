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
    <div className='border-[3px] rounded-2xl review_card md:ml-[2%] lg:ml-0 border-slate-300 p-7 flex flex-col justify-between'>
      <div className='flex flex-row'>
        <div
          className="md:w-[100px] w-[100px] h-[100px] rounded-full object-cover mr-[20px] lg:mr-[8px]"
        >
          <Image
            src={imgUrl}
            alt="planet-01"
            width={2000} 
            height={500} 
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex-1 md:ml-[40px] flex flex-col max-w-[650px]">
            <div>
              <div className='text-[#5AB2FF] text-2xl font-semibold lg:ml-[1%] '>{username} 님</div>
            </div>
            <div className='text-black text-xl font-medium lg:ml-[1%] mt-[3%] '>{identity}</div>
          </div>
        </div>
      </div>

      <h4 className="lg:text-[30px] text-[26px] text-black font-semibold mt-[5%] text-balance ">
        {title}
      </h4>
      <p className="mt-[16px] font-normal lg:text-[19px] text-[18px] text-black text-balance ">
        {subtitle}
      </p>
      <div className='text-blue-500 mt-[3%] text-[19px] '>{hashtag}</div>


    </div>
  </motion.div>
);

export default ReviewCard;
