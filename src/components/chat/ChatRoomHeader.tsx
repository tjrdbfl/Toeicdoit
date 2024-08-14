import Image from "next/image";
import { ChatRoomPhoto } from "@/service/chat/util";
import PersonIcon from '@mui/icons-material/Person';
import { ChatRoomData } from "@/types/ChatData";
import AlertMessage from "./AlertMessage";
import { countUniqueElements } from "@/service/utils/utils";


const ChatRoomHeader = ({ room }: { room: ChatRoomData }) => {
    
    return (<div className="flex flex-row gap-x-5">
        <div className="relative object-fill w-[70px] h-[70px] rounded-lg border-slate-200 border-2 bg-white flex items-center justify-center">
            <Image loading="lazy"
                src={ChatRoomPhoto(room.roomCategories[0])}
                alt={"chat_room_photo"}
                width={70}
                height={70}
                style={{ borderRadius: 20 }}
            />
        </div>
        <div className="flex flex-col mt-2">
            <h1
                className="text-black text-[16px] font-medium text-pretty mb-2"
            >{room.title}</h1>
            <div className="flex flex-row gap-x-2">
                <PersonIcon className="text-zinc-400" />
                <h2 className="text-zinc-400 text-[16px]">{countUniqueElements(room.adminIds,room.memberIds)}</h2>
            </div>
        </div>

        <AlertMessage/>
    </div>);
}
export default ChatRoomHeader;