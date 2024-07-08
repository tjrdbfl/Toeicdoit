import { ChatRoomPhoto, ChatUserPhoto } from "@/service/chat/util";
import Image from "next/image";

const ChatCard = (item: {
    id: number;
    name: string;
    title: string;
    member: number;
    category: string;
}
) => {

    return (<>
        <div
            onClick={()=>{}}
            key={item.id}
            className="bg-white w-full h-[130px] border-b-slate-200 border-b-2 flex flex-col p-3 hover:bg-slate-50"
        >
            <div className="flex flex-row justify-between gap-x-2">
                <div className="flex flex-col">
                    <h4 className="text-black text-lg text-pretty font-medium leading-6">{item.title}</h4>
                    <h5
                    className="text-blue-500 mt-2"
                    ># {item.category}</h5>
                    <div className="flex flex-row gap-x-2 mt-1">
                        <div className="w-[25px] object-fill rounded-full">
                            <Image 
                            src={ChatUserPhoto(item.id)} 
                            alt={"user-info"}
                            width={100}
                            height={100}                            
                            />
                        </div>
                    <h6 className="text-zinc-500">
                        {item.member}명
                    </h6>
                    </div>
                    
                </div>
                <div className="object-fill w-[200px] h-[100px] border-slate-200 border-2 flex items-center">
                    <Image
                        src={ChatRoomPhoto(item.category)}
                        alt={"chat-roon-profile"}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        </div>
    </>);
}
export default ChatCard;