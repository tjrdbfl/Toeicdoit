
import { LogoIcon } from "@/components/common";
import Modal from "@/components/common/Modal";
import { ChatRoomData } from "@/types/ChatData";

export default async function ChatPage() {
    
    const chat:ChatRoomData[]=[];
    //유저의 기존 채팅방 페이지 server action
    
    return (<>

        <Modal>
            <div className="bg-white w-[500px] h-[650px] shadow-lg border-slate-200 border-2 p-2">
                <div className="flex flex-row py-2">
                    <LogoIcon size={25} />
                    <p className="text-[#5AB2FF] text-xl ">토익두잇 오픈채팅</p>
                </div>

                <div className="overflow-y-auto h-[500px] scroll-area">
                    <div className="p-3">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-black text-lg">나의 오픈채팅방</h2>
                           
                        </div>
                        <div className="overflox-x-auto bg-red-100 w-full h-[150px]">
                                {chat ? 
                                chat.map((item)=>{
                                    return(<>
                                </>);
                                }):
                                <>
                                <div className="bg-blue-100 rounded-lg w-[100px] ">

                                </div>
                                </>
                                }
                            </div>  
                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                    <div className="p-3">
                        <h2 className="text-black text-lg">인기있는 오픈채팅방</h2>

                    </div>
                </div>

            </div>
        </Modal>
    </>);
}