'use client';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const MoveToTopBtn=()=>{

    const MoveToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    };
    return (<>
    <button onClick={MoveToTop}
    className='bg-black hover:bg-zinc-800 hover:ring-2 rounded-full h-auto w-auto p-2'>
        <KeyboardArrowUpIcon
        className="text-white text-5xl"/>
    </button>
    </>);
}
export default MoveToTopBtn;