'use client';

import { NewFeatures, StartSteps } from '@/components/dashboard';
import { TypingText, TitleText } from '@/components/dashboard/CustomTexts';
import { styles, newFeatures } from '@/constants/styles/dashboard';
import { planetVariants, fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';


const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
     
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        <TypingText title="| AI 선생님의 해설강의" />
        <TitleText title={<>생동감 넘치는 AI 선생님의 해설 강의를 통해 학습에 대한 몰입도를 향상시킵니다.</>} />
        <div className='mt-[3%]'/>
        <div className="flex flex-wrap justify-between ">
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
