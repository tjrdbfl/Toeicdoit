'use client';

import ChatCard from "@/components/chat/ChatCard";
import ChatCategory from "@/components/chat/ChatCategory";
import { CommonHeader } from "@/config/headers";
import { SERVER } from "@/constants/enums/API";
import { fetchItems } from "@/service/toeic/items";
import { ChatData, ChatRoomData } from "@/types/ChatData";
import { useInfiniteQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatRoom from "./ChatRoom";
import ChatModal from "@/components/chat/ChatModal";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";

const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

const ChatScrollArea = ({ children }: {
    children: React.ReactNode
}) => {

    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['items'],
        queryFn: fetchItems,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }
        , [fetchNextPage, inView])
    // const { data, error, status, fetchNextPage, isFetchingNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ['questions', id],
    //         queryFn: ({ pageParam = 1 }) => fetchQuestions({ pageParam, level: id }),
    //         initialPageParam: 1,
    //         getNextPageParam: (lastPage) => lastPage.nextPage,
    //     });

    async function getChatRoom(formData: FormData) {

        const rawFormData = {
            category: formData.get(`category`)
        }

        console.log('rawFormData: ' + rawFormData.category?.toString());
    }

    const [roomOpen, setRoomOpen] = useState<boolean>(false);
    const [chatRoom, setChatRoom] = useState<ChatRoomData>({
        id: '',
        title: '',
        admins: [],
        members: [],
    });
    const [roomId, setRoomId] = useState<string>('');

    let chat: ChatData = {
        id: "",
        roomId: "",
        senderId: "",
        senderName: "",
        message: "",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    //사용자 인증 필요
    const clickChatRoom = async (room: ChatRoomData) => {
        setRoomId(room.id);
        setRoomOpen(true);

        setChatRoom({
            id: room.id.toString(),
            title: "토익 스터디 모집해요! 강남구 서초대로 74길에서 진행할 예정입니다~",
            admins: [],
            members: []
        });

        // const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}?roomId=${roomId}`,{
        //     method:'GET',
        //     headers:CommonHeader
        // })

        // const tempData=await response.json();
        // chat=tempData.data;
    }

    return (<>
        <div className="overflow-y-auto h-[580px] scroll-area p-2">
            {children}
            <div className="p-3">
                <h2 className="text-black text-lg font-semibold mb-3">인기있는 오픈채팅방</h2>
                <form
                    action={getChatRoom}
                    className="mb-5"
                >
                    <ChatCategory />
                </form>
                <div
                    className="flex flex-col w-full h-full">
                    {data?.pages.map((page) => {

                        return (<>
                            {page.data.map((item) => {
                                return (
                                    <div
                                        onClick={() => clickChatRoom({
                                            id: item.id.toString(),
                                            title: "토익 스터디 모집해요! 강남구 서초대로 74길에서 진행할 예정입니다~",
                                            admins: [],
                                            members: [],
                                        })}
                                        key={item.id}
                                        ref={ref}>
                                        <ChatCard
                                            key={item.id}
                                            id={item.id}
                                            name={"item.name"}
                                            title={"토익 스터디 모집해요! 강남구 서초대로 74길에서 진행할 예정입니다~"}
                                            member={70}
                                            category={"스터디 모집"}
                                        />
                                    </div>
                                )
                            })}
                        </>)
                    })}
                </div>
            </div>

            {roomOpen &&
                <ChatModal
                    header={<ChatRoomHeader
                        room={chatRoom}
                    />}
                    setOpen={setRoomOpen}>
                    <ChatRoom chat={{
                        id: "",
                        roomId: "",
                        senderId: "",
                        senderName: "",
                        message: "",
                        createdAt: undefined,
                        updatedAt: undefined
                    }} />
                </ChatModal>
            }


            {isFetchingNextPage && <PaginationLoading />}
        </div>

    </>);
}
export default ChatScrollArea;