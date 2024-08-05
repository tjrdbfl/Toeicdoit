'use client';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';

const GoBackBtn=({id}:{id:number})=>{

    const router=useRouter();
    return(<>
    <button
    disabled={id===0}
    className={`${id!==0 ? 'go_btn':'bg-white shadow-md rounded-xl border-slate-100 border-2 z-10'} flex flex-row px-2 justify-center items-center`}
    onClick={()=>router.push(`/notice/${id}`)}
    >
    <KeyboardArrowLeftIcon className='text-black'/>
    <p className='text-black text-[16px]'>이전</p>
    </button>
    </>);
}
export default GoBackBtn;