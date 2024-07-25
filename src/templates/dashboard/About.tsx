'use client';

import { TypingText } from '@/components/dashboard/CustomTexts';
import { styles } from '@/constants/styles/dashboard';
import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';

const About = () => (
  <section className={`${styles.xPaddings} relative z-10`}>
   
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Toeicdoit" textStyles="text-start" />
      
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal text-[20px] text-black text-center"
        style={{ marginTop: '30px',lineHeight:'40px'}} 
      >
        <span className="font-medium text-black mr-2 text-3xl"
        >Toeicdoit</span> 
        은 많은 학습 데이터를 바탕으로     {' '}
        <span className="font-semibold text-black">당신만의 학습 패턴</span> 을 분석하여 더욱 효과적인 학습을 가능하게 합니다.
         {' '}
        <br/><span className="font-semibold text-black text-2xl">당신의 성공적인 토익 여정을 위한 완벽한 파트너!</span><br/>
        지금 바로 토익 두잇으로 시작하여 목표 점수를 달성하고 꿈의 미래를 향해 나아가세요!
      </motion.p>
      
      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/svgs/dashboard/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[24px] object-contain"
        style={{ marginTop: '30px' }} 
      />
    </motion.div>
  </section>
);

export default About;
