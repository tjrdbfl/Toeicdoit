'use client';
import Image from "next/image";
import CreateChatForm from '@/templates/chat/CreateChatForm';
import AddIcon from '@mui/icons-material/Add';
import { SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CreateChatBtn = () => {

    const [create, setCreate] = useState<boolean>(false);

    return (<>
        <button
            onClick={() => setCreate(true)}
            className="bg-white mb-5 text-black font-semibold p-2 rounded-lg shadow-lg flex flex-row justify-center items-center gap-x-2 hover:bg-slate-50">
             <Image
                src={"/svgs/icons/add-icon.svg"}
                alt={"setting-icon"}
                width={17}
                height={17}
                className="w-[20px] h-[20px]"
            />
            <p className='text-[14px]'>만들기</p>
        </button>
        {create && <>
            <dialog
                className="fixed inset-0 z-20 flex justify-end items-end mr-40 mb-40"
            >
                <div
                    className="bg-blue-100 w-[400px] h-[450px] shadow-lg border-slate-200 border-2 p-5"
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
                    <CreateChatForm setCreate={setCreate} />
                </div>

            </dialog>

        </>}
    </>);
}
export default CreateChatBtn;