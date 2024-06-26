'use client';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';

const GoBackBtn=({id}:{id:number})=>{

    const router=useRouter();
    return(<>
    {id!==1 && <button
    className="go_btn flex flex-row p-3 justify-center items-center"
    onClick={()=>router.push(`/notice/${id-1}`)}
    >
    <KeyboardArrowLeftIcon className='text-black text-2xl'/>
    <p className='text-black text-xl'>이전</p>
    </button>}
    </>);
}
export default GoBackBtn;