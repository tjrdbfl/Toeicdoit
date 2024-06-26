'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { exploreWorlds, styles } from '@/constants/styles/dashboard';
import { TitleText, TypingText } from '@/components/dashboard/CustomTexts';
import { ExploreCard } from '@/components/dashboard';

const Explore = () => {
  const [active, setActive] = useState('function-2');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| 최적의 학습 경로 제공" textStyles="text-center" />
        <TitleText
          title={<>Toeicdoit은 <br className="md:block hidden" /> 더욱 간편하고 효율적인 토익 공부 경험을 선사합니다!</>}
          textStyles="text-center"
        />
        <div className="mt-[30px]" />
        <div className=" flex flex-wrap md:flex-col md:flex-nowrap mt-[50px] min-h-[70vh]">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
