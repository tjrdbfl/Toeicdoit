'use client';
import ChatRoomToolBtn from "@/components/button/ChatRoomToolBtn";
import CreateChatBtn from "@/components/button/CreateChatBtn";
import SettingRoomToolBtn from "@/components/button/SettingRoomToolBtn";
import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";
import { enterRoom } from "@/service/chat/actions";
import { ChatRoomPhoto } from "@/service/chat/util";
import { handleError } from "@/service/utils/error";
import { ChatRoomData } from "@/types/ChatData";
import Image from "next/image";
import Link from "next/link";

const UserChatRoom = ({ chat }: { chat: ChatRoomData[] }) => {

    return (<>
        <div className="p-3">
            <div className="flex flex-row justify-between">
                <h2 className="text-black text-lg mb-5 font-semibold">나의 오픈채팅방</h2>
                <div className="flex flex-row gap-x-2 items-center">
                    <SettingRoomToolBtn chat={chat[0]} />
                    <CreateChatBtn />
                </div>
            </div>
            <ScrollArea
                className="relative w-[400px] h-[180px] flex flex-row gap-x-2 overflow-x-hidden"
            >
                <div className="flex flex-row gap-x-2 mb-5">
                    {chat.length === 0 ?

                        <>
                            <div className="bg-white hover:bg-slate-50 hover:border-4 hover:border-blue-500 rounded-lg w-[230px] shadow-lg border-slate-100 border-2 flex flex-col justify-center items-center">
                                <p className="font-semibold text-center rounded-lg p-1 w-full
                                            bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                            ">오픈 채팅방을 생성해보세요!</p>
                                <div className="w-[200px] object-fill">
                                    <Image loading="lazy"
                                        src={"/images/chat/chat_main.png"}
                                        alt={"chat_main"}
                                        width={300}
                                        height={300}
                                        style={{ borderRadius: 20 }}
                                    />
                                </div>
                            </div>
                        </>
                        :

                        chat.map((item) => {
                            return (<>
                                <Link
                                    href={`?chat=true&roomId=${item.id}`}
                                    key={item.id}
                                    onClick={async()=>{
                                        const response=await enterRoom(item.id);
                                        handleError(response.message);
                                    }}
                                    className="bg-blue-50 rounded-lg w-[200px] h-[150px] p-3 shadow-lg border-slate-100 border-2 flex flex-col justify-between items-center">
                                     <p className="font-semibold text-center rounded-lg w-full mb-2
                                            bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                            ">{item.title}</p>
                                    <Image loading="lazy"
                                        src={ChatRoomPhoto(item.roomCategories[0])}
                                        alt={"chat_main"}
                                        width={300}
                                        height={300}
                                        style={{ borderRadius: 20 }}
                                        className="w-[100px] h-[80px]"
                                    />
                                </Link>

                            </>);
                        })

                    }

                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>

    </>);
}
export default UserChatRoom;