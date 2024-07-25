'use client';
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';

const ModalCloseBtn=({url}:{url:string})=>{
        return( <Link
                href={url}
                className="hover:rounded-full hover:bg-slate-100 w-7 h-7 flex items-center justify-center">
                <CloseIcon className="text-slate-400 text-lg" />
            </Link>);
}
export default ModalCloseBtn;