'use client';
import Image from 'next/image';

const MoveToTopBtn=()=>{

    const MoveToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    };
    return (<>
    <button onClick={MoveToTop}
    className='bg-black hover:bg-zinc-800 hover:ring-2 rounded-full h-auto w-auto p-2'>
        <Image loading="lazy" 
        src={'/svgs/icons/key-board-arrow-up-icon.svg'} 
        alt={'KeyboardArrowUp'}
        width={38}        
        height={38}
        />
         </button>
    </>);
}
export default MoveToTopBtn;