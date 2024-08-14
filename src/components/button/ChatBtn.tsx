'use client';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const ChatBtn = () => {

    const open = useSearchParams().get('chat');

    return (<>
        {open === 'true'
            ? <Link
                href={`/`}
                scroll={false}
                className=''>
               <Image loading="lazy"
               src={'/svgs/icons/close-white-icon.svg'}
               alt={'chat-icon'}
               width={55}
               height={55}
               className='bg-[var(--blue2)] hover:bg-[#00A9FF] rounded-full hover:ring-2 p-[13px] flex items-center justify-center'/>
            </Link>
            : <Link
                href={`?chat=true`}
                scroll={false}  //scroll방지
                shallow={true}  //새로고침
                className=''>
               <Image loading="lazy"
               src={'/svgs/icons/chat-icon.svg'}
               alt={'chat-icon'}
               width={55}
               height={55}
               className='bg-[var(--blue2)] hover:bg-[#00A9FF] rounded-full hover:ring-2 p-[13px] flex items-center justify-center'/>
            </Link>}
    </>);
}
export default ChatBtn;