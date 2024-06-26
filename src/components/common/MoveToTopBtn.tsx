import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const MoveToTopBtn=()=>{

    const MoveToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    };
    return (<>
    <button onClick={MoveToTop}
    className='bg-black rounded-full h-auto w-auto p-5'>
        <KeyboardArrowUpIcon
        className="text-white text-2xl"/>
    </button>
    </>);
}
export default MoveToTopBtn;