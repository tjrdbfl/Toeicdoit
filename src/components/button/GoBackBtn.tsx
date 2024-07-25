'use client';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';

const GoBackBtn=({id}:{id:number})=>{

    const router=useRouter();
    return(<>
    {id!==1 && <button
    className="go_btn flex flex-row px-2 justify-center items-center"
    onClick={()=>router.push(`/notice/${id-1}`)}
    >
    <KeyboardArrowLeftIcon className='text-black'/>
    <p className='text-black text-[16px]'>이전</p>
    </button>}
    </>);
}
export default GoBackBtn;