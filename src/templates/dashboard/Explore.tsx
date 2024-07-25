'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { exploreWorlds, styles } from '@/constants/styles/dashboard';
import { TitleText, TypingText } from '@/components/dashboard/CustomTexts';
import { ExploreCard } from '@/components/dashboard';
import LinkIcon from '@/components/common/LinkIcon';

const Explore = () => {
  const [active, setActive] = useState('function-2');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className='flex flex-row items-center gap-x-2 justify-center w-full'>
          <LinkIcon size={30}/>
          <TitleText
          title={<>Toeicdoit</>}
          textStyles='text-center'/>
        </div>
        <TitleText
          title={<>에서 제공하는 다양한 학습 경험을 통해 토익 실력을 증진시켜 보세요!</>}
          textStyles="text-center"
        />
        <div className="mt-[30px]" />
        <div className="flex flex-row lg:flex-nowrap mt-5 min-h-[70vh]">
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
