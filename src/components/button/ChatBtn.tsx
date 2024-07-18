'use client';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

const ChatBtn = () => {

    const open = useSearchParams().get('chat');
    
    return (<>
        {open === 'true'
            ? <Link
                href={`/`}
                scroll={false}
                className='bg-[var(--blue2)] hover:bg-[#00A9FF] hover:ring-2 rounded-full p-4 z-50'>
                <CloseIcon
                    className="text-white text-[32px]" />
            </Link>
            : <Link
                href={`?chat=true`}
                scroll={false}  //scroll방지
                shallow={true}  //새로고침
                className='bg-[var(--blue2)] hover:bg-[#00A9FF] hover:ring-2 rounded-full p-4'>
                <ChatIcon
                    className="text-white text-[96px]" />
            </Link>}
    </>);
}
export default ChatBtn;