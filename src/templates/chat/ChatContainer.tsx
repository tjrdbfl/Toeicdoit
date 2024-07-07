import CreateBtn from "@/components/button/CreateBtn";
import { LogoIcon } from "@/components/common";
import Modal from "@/components/common/Modal";
import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";
import { ChatRoomData } from "@/types/ChatData";
import Image from "next/image";

const ChatContainer = async () => {
    //유저의 기존 채팅방 페이지 server action
    const chat: ChatRoomData[] = [];
    //전체 채팅방 페이지 with infinite scroll pagination

    return (<>
        <Modal>
            <div 
            className="bg-blue-100 w-[500px] h-[650px] shadow-lg border-slate-200 border-2"
            >
                <div className="flex flex-row py-3 rounded-b-xl shadow-lg
                bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500                              
                ">
                    <LogoIcon size={25} />
                    <p className="text-white text-xl font-medium">Toeicdoit 오픈 채팅</p>
                </div>
                <div className="overflow-y-auto h-[580px] scroll-area p-2">
                    <div className="p-3">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-black text-lg mb-2 font-semibold">나의 오픈채팅방</h2>
                            <CreateBtn />
                        </div>
                        <ScrollArea
                            className="relative w-[450px] h-[180px] flex flex-row gap-x-2 overflow-x-hidden"
                        >
                            <div className="flex flex-row gap-x-2">
                                {chat.length === 0 ?

                                    <>
                                        <div className="bg-white rounded-lg w-[230px] shadow-lg border-slate-100 border-2 flex flex-col justify-center items-center">
                                            <p className="font-semibold text-center rounded-lg p-1 w-full
                                            bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                            ">오픈 채팅방을 생성해보세요!</p>
                                            <div className="w-[200px] object-fill">
                                                <Image
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
                                            <div
                                                key={item.id}
                                                className="rounded-lg w-[230px] shadow-lg border-slate-100 border-2 flex flex-col justify-center items-center">
                                                <p className="font-semibold text-center rounded-lg p-1 w-full
                                            bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                            ">{item.title}</p>
                                                <div className="w-[200px] object-fill">
                                                    <Image
                                                        src={"/images/chat/chat_main.png"}
                                                        alt={"chat_main"}
                                                        width={300}
                                                        height={300}
                                                        style={{ borderRadius: 20 }}
                                                    />
                                                </div>
                                            </div>

                                        </>);
                                    })

                                }

                            </div>

                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg font-semibold">인기있는 오픈채팅방</h2>

                    </div>

                </div>

            </div>
        </Modal>
    </>);
}
export default ChatContainer;