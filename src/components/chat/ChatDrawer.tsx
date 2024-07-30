'use client';

import { drawer } from "@/constants/chat/constant";
import PopOverOption from "./PopOverOption";
import { useState } from "react";
import Image from "next/image";
import ChatCautionModal from "./ChatCautionModal";

const ChatDrawer = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(4);

    return (<>
        <PopOverOption
            buttonChildren={
                <Image
                    src={"/svgs/icons/menu-icon.svg"}
                    alt={"menu-icon"}
                    width={20}
                    height={20}
                />}
            optionChildren={<div className="flex flex-col">
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
    </>);
}
export default ChatDrawer;