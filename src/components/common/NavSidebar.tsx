'use client';
import { useState } from "react";
import {motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import LogoIcon from "./LogoIcon";
import UserIcon from "./UserIcon";
import { useSidebarMenuAnimation } from "@/constants/styles/animation";
import SelectAuth from "../auth/SelectAuth";
import { GettingStartedBtn } from "../button/GettingStartedBtn";
import { useApp } from "@/contexts/AppContext";


const NavSidebar = ({isSticky}:{isSticky:boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useSidebarMenuAnimation(isOpen);
  const {userData}=useApp();

  return (
    <nav className={`w-full h-[50px] bg-white ${isSticky? 'mx-10':''}`} 
    ref={scope}
    >
      <div className={`w-full h-full flex justify-between gap-8 ${isSticky? '':''}`}>

        <div className="flex flex-row mt-2">
          <LogoIcon />
          <Logo />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={()=>setIsOpen(!isOpen)}
        >
          <div className="w-full h-full flex justify-between mt-[10px] px-[5px] navSidebar_div"
          >
            <p className="lg:text-black font-[550]  navSidebar_p">토익두잇 공부법</p>
            <p className="lg:text-black font-[550]  navSidebar_p">문제 풀기</p>
            <p className="lg:text-black  font-[550]  navSidebar_p">커뮤니티</p>
            <p className="lg:text-black  font-[550]  navSidebar_p">고객센터</p>
          </div>

        </motion.button>

        {/* <SelectAuth/> */}
        {userData ? 
        <>
          <SelectAuth/>
        </> : <GettingStartedBtn isSticky={isSticky} />}
      
      </div>
      <ul
        className="menu-list bg-white h-auto w-full rounded-b-3xl px-10 py-5 mt-2 border-t-zinc-200 border-t-2 flex flex-col justify-start absolute"
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
          <Link className=' navSidebar_ul_link' href={''}>공부법 추천</Link>
          <Link className=' navSidebar_ul_link' href={''}>토익두잇 FAQ</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>문제풀기</p>
          <Link className=' navSidebar_ul_link' href={'/exam'}>실전 모의고사</Link>
          <Link className=' navSidebar_ul_link' href={'/level'}>수준별 연습문제</Link>
          <Link className=' navSidebar_ul_link' href={'/part'}>파트별 연습문제</Link>
          <Link className=' navSidebar_ul_link' href={'/test'}>레벨 테스트</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p'>커뮤니티</p>
          <Link className=' navSidebar_ul_link' href={'/notice'}>공지사항</Link>
          <Link className=' navSidebar_ul_link' href={'/post'}>자유게시판</Link>
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