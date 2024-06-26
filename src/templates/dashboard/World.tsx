'use client';

import { TypingText, TitleText } from '@/components/dashboard/CustomTexts';
import { styles } from '@/constants/styles/dashboard';
import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';


const World = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >

      <TypingText title="| AI Level Test" textStyles="text-center" />
      <TitleText
        title={(
          <>AI 진단 테스트를 통해 현재 실력을 정확히 알아보세요
          </>
        )}
        textStyles="text-center"
      />

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="relative mt-[68px] flex w-full h-[550px]"
      >

        <div
          className="w-full h-full object-cover mt-[5%]"
        >
          <Image
            width={2000} 
            height={500} 
            src="/images/dashboard/map.png"
            alt="map"
          />
        </div>


        <div className="absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680] object-cover">
          <Image
            width={2000} 
            height={500} 
            src="/images/dashboard/people-01.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680] object-cover">
          <Image
            width={2000} 
            height={500} 
            src="/images/dashboard/people-02.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680] object-cover">
          <Image
           width={2000} 
           height={500} 
            src="/images/dashboard/people-03.png" alt="people" className="w-full h-full" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;
