import LinkIcon from '@/components/common/LinkIcon';
import { PG } from '@/constants/enums/PG';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';

const FreeLink = ({label}:{label:string}) => {
    return (<>
        <div className="flex flex-row gap-x-2 items-center">
            <Link
                href={'/'}
                className="text-black hover:text-slate-500 underline flex flex-row items-center gap-x-2">
                     <LinkIcon size={20}/>
                    Toeicdoit(KR)
                    </Link>
            <KeyboardArrowRightIcon className="text-slate-600 text-2xl" />
            <Link
                href={`${PG.FREE}`}
                className="text-black hover:text-slate-500 underline">자유게시판</Link>
           {label!=='' && <>
            <KeyboardArrowRightIcon className="text-slate-600 text-3xl" />
            <p
                className="text-black text-[16px]">
                {label}
            </p>
           </>}

        </div>
    </>);
}
export default FreeLink;