'use client';

import { MoreInfoBtn } from '@/components/button/MoreInfoBtn';
import { TypingText, TitleText } from '@/components/dashboard/CustomTexts';
import ReviewCard from '@/components/dashboard/ReviewCard';
import { styles,reviews } from '@/constants/styles/dashboard';
import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';


const Review = () => (
  <>
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.01 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className='mt-[5%]'/>
      <TypingText title="| 수 많은 토익 졸업생들이 증명합니다" textStyles="text-center" />
      <div className='mt-[1%]'/>
      <TitleText title={<>Toeicdoit 졸업생들의 성공 후기!</>} textStyles="text-center" />
      <div className='mt-[3%]'/>
      <div className="mt-[50px] flex flex-wrap justify-between">
        {reviews.map((item, index) => (
          <ReviewCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
  <MoreInfoBtn />
   </>
);

export default Review;
