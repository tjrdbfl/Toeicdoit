import { Dispatch, SetStateAction } from "react";

const ChatToolModal=({name,setOpen}:{
    name:string
    setOpen:Dispatch<SetStateAction<boolean>>
})=>{
    
    return(<>
    <dialog
    className="fixed inset-0 z-20 flex mt-84 lg:mr-64"
    >
        <div className="bg-white w-auto h-auto shadow-lg">
           
        </div>
    </dialog>
    </>);
}
export default ChatToolModal;