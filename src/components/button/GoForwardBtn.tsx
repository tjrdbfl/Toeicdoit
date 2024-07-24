'use client';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

const GoForwardBtn = ({ id,totalIndex }: { id: number,totalIndex:number }) => {
    
    const router = useRouter();

    return (<>
        {id !== totalIndex && <button
            className="go_btn flex flex-row px-3 py-2 justify-center items-center"
            onClick={() => router.push(`/notice/${++id}`)}
        >
            <p className='text-black text-[15px]'>다음</p>
            <KeyboardArrowRightIcon className='text-black text-xl' />
        </button>}
    </>);
}
export default GoForwardBtn;