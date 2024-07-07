'use client';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import ChatContainer from '@/templates/chat/ChatContainer';

const ChatBtn = () => {

    const open = useSearchParams().get('chat');
    console.log("Chat Btn open: " + open);

    return (<>
        {open === 'true'
            ? <Link
                href={`/`}
                scroll={false}
                className='bg-[#5AB2FF] hover:bg-[#00A9FF] hover:ring-2 rounded-full px-4 py-5 z-50'>
                <CloseIcon
                    className="text-white text-[32px]" />
            </Link>
            : <Link
                href={`?chat=true`}
                scroll={false}  //scroll방지
                shallow={true}  //새로고침
                className='bg-[#5AB2FF] hover:bg-[#00A9FF] hover:ring-2 rounded-full px-4 py-5'>
                <ChatIcon
                    className="text-white text-[32px]" />
            </Link>}
    </>);
}
export default ChatBtn;