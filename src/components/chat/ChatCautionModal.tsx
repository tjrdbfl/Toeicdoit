import { Dispatch, SetStateAction } from "react";

const ChatCautionModal=({name,setOpen}:{
    name:string
    setOpen:Dispatch<SetStateAction<boolean>>
})=>{
    
    return(<>
    <dialog
    className="fixed inset-0 z-20 flex mt-84 lg:mr-64"
    >
        <div className="bg-white w-auto h-auto shadow-lg py-3 px-5">
            <p className="text-black font-semibold text-lg">&#39;{name}&#39; 님을 차단하시겠습니까?</p>
            <div className="flex flex-row gap-x-3 justify-end mt-3">
                <button
                onClick={()=>setOpen(false)}
                className="text-blue-500 text-lg hover:bg-blue-50 rounded-full p-2"
                >
                    <p>취소</p>
                </button>
                <button
                onClick={()=>setOpen(false)}
                className="text-blue-500 text-lg hover:bg-blue-50 rounded-full p-2"
                >
                    <p>차단</p>
                </button>
            </div>
        </div>
    </dialog>
    </>);
}
export default ChatCautionModal;