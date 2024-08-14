import { Dispatch, SetStateAction } from "react";

const ChatToolModal = ({ name, setOpen, block }: {
    name: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
    block: { id: number, title: string, message: string }[]
}) => {

    return (<>
        <dialog className="bg-white w-auto h-auto shadow-lg z-60">
            {block.map((item) => {
                return (
                <div
                key={item.id}
                className="bg-white border-black text-black p-2 border-1 w-[100px]"
                >
                    {item.title}
                </div>);
            })}
        </dialog>
    </>);
}
export default ChatToolModal;