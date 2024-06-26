'use client';

import { motion } from 'framer-motion';
import { styles } from '@/constants/styles/dashboard';
import { navVariants } from '@/utils/motion';

import { useEffect, useState } from 'react';
import NavSidebar from '@/components/common/NavSidebar';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0); 
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return(<>
 
  <div className={`${isSticky? '': 'total_padding'}`}>
  <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${isSticky===true?  'fixed' : 'relative'}`}
      style={{zIndex:100}}
    >
      {isSticky? <>
      <div className={`fixed top-0 bg-white w-full border-b-2 border-r-2 border-l-2 border-slate-200 py-1 mb-5`}>
        <div className='flex items-center justify-center'>
        <NavSidebar isSticky={isSticky} />
        </div>
      
        </div>  
      </>
      :
      <div className='py-[3%]'>

        <div className="absolute w-[50%] inset-0 gradient-01" />
        <div
          className={`${styles.innerWidth} mx-auto bg-white p-5 rounded-b-3xl md:absolute md:shadow-lg`}
        >
          <NavSidebar isSticky={isSticky}/>
        </div>
      </div>}
    </motion.nav>
    </div>
  </>);
}
  

export default Navbar;
