'use client';
import CreateChatForm from '@/templates/chat/CreateChatForm';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CreateBtn = () => {

    const [create, setCreate] = useState<boolean>(false);

    return (<>
        <button
            onClick={() => setCreate(true)}
            className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-lg flex flex-row justify-center items-center gapx-x-2 hover:bg-slate-50">
            <AddIcon />
            <p className=''>만들기</p>
        </button>
        {create && <>
            <dialog
                className="fixed inset-0 z-20 flex justify-end items-end m-28"
            >
                <div
                    className="bg-blue-100 w-[500px] h-[650px] shadow-lg border-slate-200 border-2 p-5"
                >
                    <div className='flex flex-row justify-between items-center'>
                        <h1 
                        className="form_label mt-2"
                        >오픈 채팅방 만들기</h1>
                        <button
                        onClick={()=>setCreate(false)}
                        className='hover:bg-blue-50 rounded-full flex items-center justify-center p-2'
                        >
                        <CloseIcon className=''/>
                        </button>
                        
                    </div>
                    <CreateChatForm />
                </div>

            </dialog>

        </>}
    </>);
}
export default CreateBtn;