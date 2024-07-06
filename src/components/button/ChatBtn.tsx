'use client';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

const ChatBtn = () => {

    const pathname = usePathname();
    console.log("pathname: " + pathname);
    return (<>
        {pathname === '/chat'
            ? <Link
                href={`/`}
                scroll={false}
                className='bg-[#5AB2FF] hover:bg-[#00A9FF] hover:ring-2 rounded-full px-4 py-5 z-50'>
                <CloseIcon
                    className="text-white text-[32px]" />
            </Link>
            : <Link
                href={`/chat`}
                scroll={false}
                className='bg-[#5AB2FF] hover:bg-[#00A9FF] hover:ring-2 rounded-full px-4 py-5'>
                <ChatIcon
                    className="text-white text-[32px]" />
            </Link>}
    </>);
}
export default ChatBtn;