'use client';
import Link from "next/link";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import { usePathname } from "next/navigation";


const Sidebar = () => {
    const currentUrl = usePathname();

    return (<>
        <div
            className={`sidebar_container container_color`}>
            <Link href={"/user-info"}
                className="sidebar_fill"
            >
                <AccountCircleOutlinedIcon className={`sidebar_icons ${currentUrl === '/user-info' ? 'font-semibold' : ''}`} />
                <p
                    className={`sidebar_texts ${currentUrl === '/user-info' ? 'font-semibold' : ''}`}
                >회원정보</p>
            </Link>

            <Link href={"/calender"}
                className="sidebar_fill"
            >
                <CalendarMonthOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === '/calender' ? 'font-semibold' : ''}`}
                >캘린더</p>
            </Link>
            <Link href={"/result"}
                className="sidebar_fill"
            >
                <DrawOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === '/result' ? 'font-semibold' : ''}`}
                >레벨테스트 및 문제풀이</p>
            </Link>
            <Link href={"/inquiry-details"}
                className="sidebar_fill"
            >
                <FindInPageOutlinedIcon className="sidebar_icons" />
                <p
                    className={`sidebar_texts ${currentUrl === '/inquiry-details' ? 'font-semibold' : ''}`}
                >문의내역</p>
            </Link>
        </div>
        DDDD
    </>);
}
export default Sidebar;