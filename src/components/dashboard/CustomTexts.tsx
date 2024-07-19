'use client';

import { textContainer, textVariant2 } from '@/utils/motion';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}

export const TypingText:FC<TypingTextProps> = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[18px] text-black  ${textStyles}`}
  >
    {Array.from(title).map((letter:string, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

interface TitleTextProps {
  title: React.ReactNode;
  textStyles?: string;
}

export const TitleText:FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`font-medium text-[24px] text-black text-balance ${textStyles}`}
  >
    {title}
  </motion.h2>
);
