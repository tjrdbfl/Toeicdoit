'use client';
import { PG } from '@/constants/enums/PG';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

const GoForwardBtn = ({ id, type, totalElements }: {
    id: number,
    type: string,
    totalElements:number
}) => {

    const router = useRouter();

    return (<>
        <button
            disabled={id>=totalElements-1}
            className={`${id<totalElements-1 ? 'go_btn' : 'bg-white shadow-md rounded-xl border-slate-100 border-2 z-10'} flex flex-row p-2 justify-center items-center`}
            onClick={() => router.push(`${type==='notice'? PG.NOTICE:PG.FREE}/${++id}`)}
        >
            <p className='text-black text-[15px]'>다음</p>
            <KeyboardArrowRightIcon className='text-black text-xl' />
        </button>
    </>);
}
export default GoForwardBtn;