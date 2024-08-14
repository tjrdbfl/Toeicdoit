'use client';

import { LogoIcon } from '@/components/common';
import { socials, styles } from '@/constants/styles/dashboard';
import { footerVariants } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {

  return(<motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative total_padding`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
     
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className='flex flex-row items-center'>
          <LogoIcon size={25}/>
          <h4 className="font-extrabold text-[22px] text-[var(--blue2)]">
            Toeicdoit
          </h4>
          </div>
          <p className="font-normal text-[14px] text-black opacity-50">
            Copyright © 2024 Toeicdoit. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <div
                key={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              >
                <Image loading="lazy"
                  key={social.name}
                  src={social.url}
                  alt={social.name}
                  width={1000}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

}
  
export default Footer;
