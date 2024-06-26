'use client';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';
import { useSelectAuthAnimation } from '@/constants/styles/animation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '../common';
import { useApp } from '@/contexts/AppContext';

const SelectAuth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useSelectAuthAnimation(isOpen);

    const {userData} = useApp();

    return (<>
        <nav className="w-[150px] h-[30px] flex items-center justify-center mt-[10px]" ref={scope}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className=''>
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex flex-row items-center justify-center mx-[1%]">
                        <UserIcon />
                        <p className="text-xl text-black font-semibold w-[90px]">{userData?.firstName} 님</p>
                        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16" />
                            </svg>
                        </div>
                    </div>


                </motion.button>
            </div>

            <ul
                className="menu-list bg-white h-auto w-[160px] rounded-b-xl mt-[140px] border-zinc-200 border-[3px] flex flex-col absolute"
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    zIndex: 10,
                }}
            >
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <Link className='text-black text-[18px] font-semibold' href={'/user-info'}>마이페이지</Link>
                </li>
                <div className='h-[2px] bg-slate-200'/>
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <LogoutBtn />
                </li>

            </ul>{" "}

        </nav>

    </>);
}
export default SelectAuth;