'use client';

import { TypingText } from '@/components/dashboard/CustomTexts';
import { styles } from '@/constants/styles/dashboard';
import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
   
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Toeicdoit" textStyles="text-center" />
      
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal text-[24px] text-center text-black"
        style={{ marginTop: '30px',lineHeight:'36px'}} 
      >
        <span className="font-semibold text-black mr-2"
        >Toeicdoit</span> 
        학습 데이터를 바탕으로 당신에게 최적화된 학습 경험을 제공합니다. {' '}
        <br/><span className="font-semibold text-black">
        토익두잇
        </span>{' '}
        은 단순히 학습 데이터만 활용하는 것이 아니라, {' '}
        <span className="font-semibold text-black">당신만의 학습 패턴</span> 을 분석하여 더욱 효과적인 학습을 가능하게 합니다.
         {' '}
        <br/><span className="font-semibold text-black">당신의 성공적인 토익 여정을 위한 완벽한 파트너!</span><br/>
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
