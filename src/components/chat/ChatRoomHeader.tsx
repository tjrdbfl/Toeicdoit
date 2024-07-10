'use client';
import Image from "next/image";
import { ChatRoomPhoto } from "@/service/chat/util";
import PersonIcon from '@mui/icons-material/Person';
import { ChatRoomData } from "@/types/ChatData";
import ExitMessage from "./ExitMessage";


const ChatRoomHeader = ({ room }: { room: ChatRoomData }) => {
    
    return (<>
        <div className="relative object-fill w-[120px] h-[80px] rounded-lg border-slate-200 border-2 bg-white flex items-center justify-center">
            <Image
                src={ChatRoomPhoto("스터디 모집")}
                alt={"chat_room_photo"}
                width={120}
                height={100}
                style={{ borderRadius: 20 }}
            />
        </div>
        <div className="flex flex-col">
            <h1
                className="text-black text-[16px] font-medium text-pretty mb-2"
            >{room.title}</h1>
            <div className="flex flex-row gap-x-2">
                <PersonIcon className="text-zinc-400" />
                <h2 className="text-zinc-400 text-[16px]">{room.members.length}</h2>
            </div>
        </div>

        <ExitMessage/>
    </>);
}
export default ChatRoomHeader;