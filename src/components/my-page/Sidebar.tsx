'use client';
import Link from "next/link";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import { usePathname } from "next/navigation";
import { PG } from "@/constants/enums/PG";
import Image from "next/image";


const Sidebar = () => {
    const currentUrl = usePathname();

    return (<>
        <div
            className={`sidebar_container container_color`}>
            <Link href={`${PG.USER_INFO}`}
                className="sidebar_fill"
            >
                <AccountCircleOutlinedIcon className={`sidebar_icons ${currentUrl === `${PG.USER_INFO}` ? 'font-semibold' : ''}`} />
                <p
                    className={`sidebar_texts ${currentUrl === `${PG.USER_INFO}` ? 'font-semibold' : ''}`}
                >회원정보</p>
            </Link>

            <Link href={`${PG.CALENDAR}`}
                className="sidebar_fill"
            >
                <CalendarMonthOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === `${PG.CALENDAR}` ? 'font-semibold' : ''}`}
                >캘린더</p>
            </Link>
            <Link href={`${PG.RESULT}`}
                className="sidebar_fill"
            >
                <DrawOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === `${PG.RESULT}` ? 'font-semibold' : ''}`}
                >레벨테스트 및 문제풀이</p>
            </Link>
            <Link href={`${PG.INQUIRY_DETAILS}`}
                className="sidebar_fill"
            >
                <FindInPageOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === `${PG.INQUIRY_DETAILS}` ? 'font-semibold' : ''}`}
                >게시글 및 문의</p>
            </Link>
            <Link href={`${PG.WITHDRAWAL}`}
                className="sidebar_fill"
            >
                <Image loading="lazy" 
                src={"/svgs/icons/person-off-icon.svg"} 
                alt={"person-off"}
                width={22}
                height={22}
                className="mr-5"
                />
                <p
                    className={`sidebar_texts ${currentUrl === `${PG.WITHDRAWAL}` ? 'font-semibold' : ''}`}
                >회원탈퇴</p>
            </Link>
        </div>
    </>);
}
export default Sidebar;