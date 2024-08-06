'use client';
import { PG } from '@/constants/enums/PG';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';

const GoBackBtn = ({ id, type }: {
    id: number,
    type: string
}) => {

    console.log('page: ' + (id === 0));
    const router = useRouter();
    return (<>
        <button
            disabled={id === 0}
            className={`${id !== 0 ? 'go_btn' : 'bg-white shadow-md rounded-xl border-slate-100 border-2 z-10'} flex flex-row px-2 justify-center items-center`}
            onClick={() => {
                if (id !== 0) {
                    router.push(`${type==='notice'? PG.NOTICE:PG.FREE}/${id - 1}`);
                }
            }}
        >
            <KeyboardArrowLeftIcon className='text-black' />
            <p className='text-black text-[16px]'>이전</p>
        </button>
    </>);
}
export default GoBackBtn;