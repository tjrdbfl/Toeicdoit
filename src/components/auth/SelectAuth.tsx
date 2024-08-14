'use client';
import Link from 'next/link';
import LogoutBtn from '../button/LogoutBtn';
import { useSelectAuthAnimation } from '@/constants/styles/animation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PG } from '@/constants/enums/PG';
import Image from 'next/image';

const SelectAuth = ({name,toeicLevel}:{
    name:string|null|undefined
    ,toeicLevel:number|null|undefined
}) => {
    const [isOpenSelectAuth, setIsOpenSelectAuth] = useState(false); 
    const scope = useSelectAuthAnimation(isOpenSelectAuth);

    console.log('toeicLevel: '+toeicLevel);

    return (<>
        <div className="w-[120px] lg:w-[160px] h-[30px] flex items-center justify-center mt-[10px] z-20" 
            ref={scope}
            onClick={() => setIsOpenSelectAuth(!isOpenSelectAuth)}
        >
            <div className=''>
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpenSelectAuth(!isOpenSelectAuth)}
                >
                    <div className="flex flex-row items-center justify-between lg:gap-x-2 mx-[1%]">
                        <p className=" text-blue-500 font-semibold w-[50px] lg:w-[60px] navSidebar_p">Lv. {Number.isNaN(toeicLevel) ? 0 : toeicLevel}</p>
                        <p className=" text-black font-semibold w-[70px] navSidebar_p">{name}님</p>
                        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16" />
                            </svg>
                        </div>
                    </div>


                </motion.button>
            </div>

            <ul
                className="select-auth-menu bg-white h-auto w-[140px] lg:w-[160px] rounded-b-xl mt-40 md:mt-56 lg:mt-52 border-zinc-200 border-2 flex flex-col absolute"
                style={{
                    pointerEvents: isOpenSelectAuth ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    zIndex: 10,
                }}
            >
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <Link className='text-black navSidebar_p font-semibold' href={`${PG.USER_INFO}`}>마이페이지</Link>
                </li>
                <div className='h-[2px] bg-slate-200'/>
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <Link className='text-black navSidebar_p font-semibold' href={`${PG.PAYMENT}`}>결제하기</Link>
                </li>
                <div className='h-[2px] bg-slate-200'/>
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <Link className='text-black navSidebar_p font-semibold' href={`${PG.LOGIN}/modify`}>비밀번호 변경하기</Link>
                </li>
                <div className='h-[2px] bg-slate-200'/>
                <li className='hover:bg-slate-100 w-full h-auto flex justify-center items-center py-2'>
                    <LogoutBtn />
                </li> 
            </ul>

        </div>

    </>);
}
export default SelectAuth;