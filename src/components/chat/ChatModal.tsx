'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';

const ChatModal = ({
    header, children, setOpen
}: {
    header: React.ReactNode
    children: React.ReactNode
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const [openDrawer,setOpenDrawer]=useState<boolean>(false);

    return (<>
        <dialog
            className="fixed inset-0 z-20 flex mt-52 mr-52"
        >
            <div
                className="bg-blue-100 w-[500px] h-[700px] shadow-lg border-slate-200 border-2 p-5"
            >
                <div className='flex flex-row justify-between gap-x-5'>
                    {header}
                    <div className='flex flex-col justify-between'>
                        <button
                            onClick={() => setOpen(false)}
                            className=' flex justify-start hover:bg-blue-50 rounded-full p-2'
                        >
                            <CloseIcon className='' />
                        </button>
                        <button
                            onClick={() => setOpenDrawer(true)}
                            className=' flex justify-start hover:bg-blue-50 rounded-full p-2'
                        >
                            <DehazeIcon className='' />
                        </button>
                    </div>


                </div>
                {children}
            </div>

        </dialog>

    </>);
}
export default ChatModal;