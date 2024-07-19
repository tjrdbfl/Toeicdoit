'use client';

import { GettingStartedBtn } from '@/components/button/GettingStartedBtn';
import { socials, styles } from '@/constants/styles/dashboard';
import { footerVariants } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const FooterStarted = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
      <div className="footer-gradient" />
      <div className='flex flex-wrap justify-between'>
      <h1 className='text-[var(--blue2)] text-2xl font-semibold'>토익 두잇, 지금 바로 시작해보세요 !</h1>
      <Link href={'/login'}
      className='started-btn'
      >토익두잇 시작하기</Link>
      </div>
  </motion.footer>
);

export default FooterStarted;
