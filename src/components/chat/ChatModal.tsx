'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PopOverOption from './PopOverOption';
import { drawer } from '@/constants/chat/constant';
import ChatCautionModal from './ChatCautionModal';

const ChatModal = ({
    header, children, setOpen
}: {
    header: React.ReactNode
    children: React.ReactNode
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(4);

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
                        <PopOverOption 
                        buttonChildren={ <DehazeIcon className='' />} 
                        optionChildren={ <div className="flex flex-col">
                            {drawer.map((item) => {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setOpenModal(true)
                                            setSelectedId(item.id)
                                        }}
                                        className="bg-white w-[150px] text-black text-center font-medium p-2 border-black border-y-1 hover:bg-slate-50">
                                        {item.title}
                                    </button>
                                );
                            })}
                        </div>}
                        buttonStyle='flex justify-start hover:bg-blue-50 rounded-full p-2'
                        />
                         {openModal && <ChatCautionModal
                            type='drawer'
                            option={drawer[selectedId - 1]}
                            setOpen={setOpenModal} />}
                    </div>


                </div>
                {children}
            </div>

        </dialog>

    </>);
}
export default ChatModal;