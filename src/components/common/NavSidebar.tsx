'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import LogoIcon from "./LogoIcon";
import { useSidebarMenuAnimation } from "@/constants/styles/animation";
import SelectAuth from "../auth/SelectAuth";
import { PG } from "@/constants/enums/PG";
import { GettingStartedBtn } from "../button/GettingStartedBtn";
import { getUserIdInCookie, getUserInfoInCookie } from "@/service/utils/token";
import { UserInfoType } from "@/types/UserData";
import { useUserInfoStore } from "@/store/auth/store";


const NavSidebar = ({ isSticky }: {
  isSticky: boolean
}) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const scope = useSidebarMenuAnimation(isOpenSidebar);

  const [name,setName]=useState<string|undefined>('');
  const [toeicLevel,setToeicLevel]=useState<number|undefined>(0);

  // const {name,toeicLevel}=useUserInfoStore();

  const handleUserInfo = async () => {
    const userIdResponse = await getUserIdInCookie();

    if (userIdResponse.message === 'SUCCESS') {
      
      const userInfoResponse = await getUserInfoInCookie();

      if (userInfoResponse.message === 'SUCCESS') {
        
        setName(userInfoResponse.data?.name);
        setToeicLevel(Number(userInfoResponse.data.toeicLevel));

        // useUserInfoStore.setState({
        //   name:userInfoResponse.data.name,
        //   toeicLevel:Number(userInfoResponse.data.toeicLevel)
        // })
      
        console.log('useUserInfoStore: '+name);
      }
    }
  }

  useEffect(() => {
    handleUserInfo();

    console.log('handleUserInfo'+name);

  }, []);

  return (
    <nav className={`w-full h-[50px] bg-white ${isSticky ? 'mx-10' : ''}`}
      ref={scope}
    >
      <div className={`w-full h-full flex justify-between gap-8 ${isSticky ? '' : ''}`}>

        <div className="flex flex-row items-center">
          <LogoIcon size={25} />
          <Logo />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
          className=""
        >
          <div className="w-full h-full flex justify-between items-center px-[5px] navSidebar_div ">
            <p className="hidden sm:hidden md:block  md:text-black font-[550] navSidebar_p">토익두잇 공부법</p>
            <p className="hidden sm:hidden md:block md:text-black font-[550]  navSidebar_p">문제 풀기</p>
            <p className="hidden sm:hidden md:block md:text-black  font-[550]  navSidebar_p">커뮤니티</p>
            <p className="hidden sm:hidden md:block md:text-black  font-[550]  navSidebar_p">고객센터</p>
          </div>

        </motion.button>

        { name!=='' ?
          <SelectAuth name={name} toeicLevel={toeicLevel} />
          :
          <GettingStartedBtn isSticky={isSticky} />
        }

      </div>
      <ul
        className="menu-list bg-white h-auto w-full rounded-b-3xl px-10 py-5 mt-1 border-t-zinc-200 border-t-2 flex flex-col justify-start absolute"
        style={{
          pointerEvents: isOpenSidebar ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          zIndex: 10,
        }}
        onMouseEnter={() => setIsOpenSidebar(true)}
        onMouseLeave={() => setIsOpenSidebar(false)}
      >
        <li className='navSidebar_ul_list'>
          <p className='navSidebar_ul_p navSidebar_p'>토익두잇 공부법</p>
          <Link className='navSidebar_ul_link navSidebar_p ' href={`${PG.RECOMMEND}`}>공부법 추천</Link>
          <Link className='navSidebar_ul_link navSidebar_p ' href={`${PG.STUDY_FAQ}`}>토익두잇 FAQ</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className='navSidebar_ul_p navSidebar_p'>문제풀기</p>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.EXAM}`}>실전 모의고사</Link>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.LEVEL}`}>수준별 연습문제</Link>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.PART}`}>파트별 연습문제</Link>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.LEVEL_TEST}`}>레벨 테스트</Link>

        </li>

        <li className='navSidebar_ul_list'>
          <p className=' navSidebar_ul_p navSidebar_p'>커뮤니티</p>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.NOTICE}`}>공지사항</Link>
          <Link className=' navSidebar_ul_link navSidebar_p ' href={`${PG.FREE}`}>자유게시판</Link>
        </li>

        <li className='navSidebar_ul_list'>
          <p className='navSidebar_ul_p navSidebar_p'>고객센터</p>
          <Link className=' navSidebar_ul_link navSidebar_p' href={`${PG.REQUESTS}`}>1대1 문의</Link>
          <Link className=' navSidebar_ul_link navSidebar_p' href={`${PG.CUSTOMER_FAQ}`}>고객센터 FAQ</Link>

        </li>


      </ul>{" "}

    </nav>
  );
}
export default NavSidebar;