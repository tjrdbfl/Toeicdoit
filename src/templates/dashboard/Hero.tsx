'use client';

import { motion } from 'framer-motion';

import { textVariant, fadeIn } from '@/utils/motion';
import { styles } from '@/constants/styles/dashboard';

       
const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col items-center justify-center w-full h-full`}    
      >
      <motion.div
        variants={fadeIn("up", "tween", 0.3, 1)}
        className="relative"
      >
        <video
          width={900}
          height={900}
          autoPlay
          muted
          preload="auto"
          playsInline
          loop
          className="pointer-events-none"
        >
          <source src="/videos/main.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay flex justify-center items-center flex-col">
        <motion.div 
          
          variants={textVariant(1.1)} 
          className={'font-medium text-[24px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] text-[var(--blue2)]'}
          >
            토익 점수 향상
          </motion.div>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center font-medium text-[24px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] text-[var(--blue2)]"
          >
            지금 바로 토익 두잇 !
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
