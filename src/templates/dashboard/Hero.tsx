'use client';

import { motion } from 'framer-motion';

import { textVariant, slideIn, fadeIn } from '@/utils/motion';
import { styles } from '@/constants/styles/dashboard';
import Image from 'next/image';

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col z-0`}
    >

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="relative flex justify-center w-full"
      >
        <video
          width="85%"
          autoPlay
          muted
          preload="auto"
          playsInline
          loop
          className='h-[70%] pointer-events-none '
        >
          <source
            src='/videos/main.mp4'
            type="video/mp4"
          />
        </video>
        <div className="video-overlay flex justify-center items-center flex-col">

          <motion.div 
          
          variants={textVariant(1.1)} 
          className={styles.heroHeading}
          >
            토익 점수 향상
          </motion.div>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className={styles.heroHeading}>지금 바로 토익 두잇 !</h1>
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
