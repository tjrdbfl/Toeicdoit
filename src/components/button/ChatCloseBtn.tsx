'use client';
import { exitRoom } from '@/service/chat/actions';
import { handleError } from '@/service/utils/error';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams, usePathname, useRouter } from "next/navigation";


const ChatCloseBtn = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    
    const handleClose = async() => {
        const params = new URLSearchParams(searchParams);
        const response=await exitRoom(params.get('roomId')||'');
        
        handleError(response.message);
        
        params.delete('roomId');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (<>
        <button
            onClick={handleClose}
            className=' flex justify-start hover:bg-blue-50 rounded-full p-2'
        >
            <CloseIcon className='' />
        </button>
    </>);
}
export default ChatCloseBtn;