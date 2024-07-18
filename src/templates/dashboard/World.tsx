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
      <div className='mt-5'/>
      <TitleText
        title={(
          <>AI 진단 테스트를 통해 현재 실력을 정확히 알아보세요
          </>
        )}
        textStyles="text-center"
      />
  
    <div className='mt-5'/>  
      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="relative mt-[68px] flex w-full h-[550px]"
      >
          <div className='bg-blue-500 w-full h-full'>
            dd
          </div>
        
         </motion.div>
    </motion.div>
  </section>
);

export default World;
