import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import LinkIcon from '@/components/common/LinkIcon';

const NoticeLink = () => {
    return (<>
        <div className="flex flex-row gap-x-2 items-center">
            <Link 
            href={'/'}
            className="text-black hover:text-slate-500 underline flex flex-row items-center gap-x-2">
                 <LinkIcon size={20}/>
                Toeicdoit(KR)</Link>
            <KeyboardArrowRightIcon className="text-slate-600 text-2xl" />
            <Link 
            href={'/notice'}
            className="text-black hover:text-slate-500 underline">공지사항</Link>
        </div>
    </>);
}
export default NoticeLink;