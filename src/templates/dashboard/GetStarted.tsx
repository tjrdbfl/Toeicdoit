'use client';

import { NewFeatures, StartSteps } from '@/components/dashboard';
import { TypingText, TitleText } from '@/components/dashboard/CustomTexts';
import NewGetStarted from '@/components/dashboard/NewGetStarted';
import { styles, newFeatures, newGetStarted } from '@/constants/styles/dashboard';
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
        <TypingText title="| 토익두잇의 오픈채팅방" />
        <div className='mt-5'/>
        <TitleText title={<>토익 학습 정보와 팁을 공유하며 혼자서는 어려웠던 문제 해결이나 학습 동기 부여에 도움을 받을 수 있습니다</>} />
        <div className="flex flex-col space-y-8">
          {newGetStarted.map((feature) => (
            <NewGetStarted key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
