import { ChatRoomPhoto, ChatUserPhoto } from "@/service/chat/util";
import Image from "next/image";

const ChatCard = (item: {
    id: string;
    name: string;
    title: string;
    member: number;
    categories: string[];
    index: number;
}
) => {

    return (<>
        <div
            onClick={() => { }}
            key={item.id}
            className="bg-white w-full h-[120px] border-b-slate-200 border-b-2 flex flex-col px-3 justify-center hover:bg-slate-50"
        >
            <div className="flex flex-row justify-between items-center gap-x-2">
                <div className="flex flex-col">
                    <h4 className="text-black text-pretty font-medium leading-6">{item.title.length > 24 ? item.title.slice(0, 24) + '...' : item.title}</h4>
                    {item.categories.map((category, index) => (
                        <h5
                            key={index}
                            className="text-blue-500 mt-2"
                        ># {category}</h5>

                    ))}
                    <div className="flex flex-row gap-x-2 mt-1">
                        <div className="w-[25px] object-fill rounded-full">
                            <Image
                                src={ChatUserPhoto(item.index)}
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
                <Image
                    src={ChatRoomPhoto(item.categories[0])}
                    alt={"chat-roon-profile"}
                    width={120}
                    height={90}
                    className="flex justify-center items-center border-slate-100 border-2 rounded-xl p-2"
                />
            </div>
        </div>
    </>);
}
export default ChatCard;