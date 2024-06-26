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
      <h1 className='text-[#5AB2FF] footer-started font-semibold'>토익 두잇, 지금 바로 시작해보세요 !</h1>
      <Link href={'/login'}
      //style={{backgroundColor:'#5AB2FF', padding:15,}}
      className='started-btn'
      >토익두잇 시작하기</Link>
      </div>
    {/* <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap ">
      <h4 className="font-bold md:text-[64px] text-[44px] text-black">
          토익 두잇, 지금 바로 시작해보세요 !
        </h4>
       
      </div>
      </div> */}
  </motion.footer>
);

export default FooterStarted;
