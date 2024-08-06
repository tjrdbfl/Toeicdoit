'use client';
import { PG } from '@/constants/enums/PG';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

const GoForwardBtn = ({ id, type }: {
    id: number,
    type: string
}) => {

    const router = useRouter();

    return (<>
        <button
            //disabled={id}
            className="go_btn flex flex-row px-3 py-2 justify-center items-center"
            onClick={() => router.push(`${type==='notice'? PG.NOTICE:PG.FREE}/${++id}`)}
        >
            <p className='text-black text-[15px]'>다음</p>
            <KeyboardArrowRightIcon className='text-black text-xl' />
        </button>
    </>);
}
export default GoForwardBtn;