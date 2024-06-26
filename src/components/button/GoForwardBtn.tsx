'use client';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation';

const GoForwardBtn = ({ id,totalIndex }: { id: number,totalIndex:number }) => {
    
    const router = useRouter();

    return (<>
        {id !== totalIndex && <button
            className="go_btn flex flex-row p-3 justify-center items-center"
            onClick={() => router.push(`/notice/${++id}`)}
        >
            <p className='text-black text-xl'>다음</p>
            <KeyboardArrowRightIcon className='text-black text-2xl' />
        </button>}
    </>);
}
export default GoForwardBtn;