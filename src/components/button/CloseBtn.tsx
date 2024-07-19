import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const CloseBtn=({url}:{
    url:string
})=>{
    return(<>
    <Link
    href={url}
    className='rounded-full hover:bg-blue-50 p-2'
    >
    <CloseIcon className='text-black text-2xl'/>
    </Link>
           
    </>);
}
export default CloseBtn