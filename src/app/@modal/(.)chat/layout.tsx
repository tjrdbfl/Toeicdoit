import LogoIcon from "@/components/common/LogoIcon";
import Modal from "@/components/common/Modal";

export default function ChatLayout({ children }: {
    children: React.ReactNode
}) {
    return (<>
        <Modal>
            <div className="bg-blue-100 w-[500px] h-[650px] shadow-lg border-slate-200 border-2">
                <div className="flex flex-row py-3 rounded-b-xl shadow-lg
                bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500                              
                ">
                    <LogoIcon size={25} />
                    <p className="text-white text-xl font-medium">Toeicdoit 오픈 채팅</p>
                </div>
                {children}
            </div>
        </Modal>

    </>);
}