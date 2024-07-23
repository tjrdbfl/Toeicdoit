'use client';
import { useEffect, useState } from "react";
import {motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import LogoIcon from "./LogoIcon";
import { useSidebarMenuAnimation } from "@/constants/styles/animation";
import SelectAuth from "../auth/SelectAuth";
import { PG } from "@/constants/enums/PG";
import { GettingStartedBtn } from "../button/GettingStartedBtn";
import { IUser } from "@/store/auth/user-model";


const NavSidebar = ({userData,isSticky}:{
  userData:IUser|null|undefined,
  isSticky:boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useSidebarMenuAnimation(isOpen);

  return (
    <nav className={`w-full h-[50px] bg-white ${isSticky? 'mx-10':''}`} 
    ref={scope}
    >
      <div className={`w-full h-full flex justify-between gap-8 ${isSticky? '':''}`}>

        <div className="flex flex-row items-center">
          <LogoIcon size={25} />
          <Logo />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={()=>setIsOpen(!isOpen)}
          className=""
        >
          <div className="w-full h-full flex justify-between items-center px-[5px] navSidebar_div ">
            <p className="hidden sm:hidden md:block  md:text-black font-[550] navSidebar_p">토익두잇 공부법</p>
            <p className="hidden sm:hidden md:block md:text-black font-[550]  navSidebar_p">문제 풀기</p>
            <p className="hidden sm:hidden md:block md:text-black  font-[550]  navSidebar_p">커뮤니티</p>
            <p className="hidden sm:hidden md:block md:text-black  font-[550]  navSidebar_p">고객센터</p>
          </div>

        </motion.button>

        <SelectAuth name={'유리'} level={9}/>
    
        {/* {userData?.isLogined ? 
        <>
          <SelectAuth name={userData.name} level={userData.toeicLevel}/>
        </> : <GettingStartedBtn isSticky={isSticky} />}
       */}
      </div>
      <ul
        className="menu-list bg-white h-auto w-full rounded-b-3xl px-10 py-5 mt-1 border-t-zinc-200 border-t-2 flex flex-col justify-start absolute"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          zIndex: 10,
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>토익두잇 공부법</p>
          <Link className='navSidebar_ul_link' href={`${PG.RECOMMEND}`}>공부법 추천</Link>
          <Link className='navSidebar_ul_link' href={`${PG.STUDY_FAQ}`}>토익두잇 FAQ</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>문제풀기</p>
          <Link className=' navSidebar_ul_link' href={`${PG.EXAM}`}>실전 모의고사</Link>
          <Link className=' navSidebar_ul_link' href={`${PG.LEVEL}`}>수준별 연습문제</Link>
          <Link className=' navSidebar_ul_link' href={`${PG.PART}`}>파트별 연습문제</Link>
          <Link className=' navSidebar_ul_link' href={`${PG.LEVEL_TEST}`}>레벨 테스트</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>커뮤니티</p>
          <Link className=' navSidebar_ul_link' href={`${PG.NOTICE}`}>공지사항</Link>
          <Link className=' navSidebar_ul_link' href={`${PG.FREE}`}>자유게시판</Link>
        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>고객센터</p>
          <Link className=' navSidebar_ul_link' href={''}>1대1 문의</Link>
          <Link className=' navSidebar_ul_link' href={''}>고객센터 FAQ</Link>

        </li>


      </ul>{" "}

    </nav>
  );
}
export default NavSidebar;