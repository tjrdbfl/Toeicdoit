'use client';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useRouter } from 'next/navigation';

const WriteBtn = () => {
    
    const router=useRouter();

    const handleClick=(isLoggged:boolean)=>{
        if(isLoggged){
            router.push('/post/write');
        }else{
            alert('로그인 시에만 작성 가능합니다.');
            router.push('/login');
        }
    }
    return (<>
        <button
            className='go_btn flex flex-row gap-x-2 p-3 items-center'
            onClick={()=>handleClick(true)}
        >
            <DriveFileRenameOutlineIcon className='text-black text-xl' />
            <p className='text-black text-lg font-medium'>글쓰기</p>
        </button>
    </>);
}
export default WriteBtn;