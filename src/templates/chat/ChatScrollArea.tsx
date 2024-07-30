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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchChatRoom } from "@/service/chat/actions";
import { ScrollArea } from "@/components/utils/ScrollArea";
import { chatCategoryType } from "@/constants/chat/constant";


const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

const ChatScrollArea = ({ children }: {
    children: React.ReactNode
}) => {
    const [category,setCategory]=useState< 'STUDY' | 'FREE' | 'WORK' | 'UNI' | 'SEEK'|'ETC'>('ETC');
    
    const { data, error, status, fetchNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['chatRooms',category],
            queryFn: ({ pageParam = 1 }) => fetchChatRoom({ pageParam,category }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    const { ref, inView } = useInView();
    
    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    useEffect(()=>{
        refetch();
    },[category]);

    // const [chatRoom, setChatRoom] = useState<ChatRoomData>({
    //     id: '',
    //     title: '',
    //     members:[]
    // });

    // const [roomId, setRoomId] = useState<string>('');

    // let chat: ChatData = {
    //     id: "",
    //     roomId: "",
    //     senderId: "",
    //     senderName: "",
    //     message: "",
    //     createdAt: new Date(),
    // };

    // const createRoomIdURL=(roomId:string)=>{
    //     const params=new URLSearchParams(searchParams);
    //     params.set('roomId',roomId);
    //     return `${pathname}?${params.toString()}`;
    // }
    // //사용자 인증 필요
    // const clickChatRoom = async (room: ChatRoomData) => {
    //     setRoomId(room.id);
    //     router.push(createRoomIdURL(room.id));

    //     setChatRoom({
    //         id: room.id.toString(),
    //         title: "토익 스터디 모집해요! 강남구 서초대로 74길에서 진행할 예정입니다~",
    //         members:[]
    //     });

    //     // const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}?roomId=${roomId}`,{
    //     //     method:'GET',
    //     //     headers:CommonHeader
    //     // })

    //     // const tempData=await response.json();
    //     // chat=tempData.data;
    // }

    if(error){
        alert(error.message);
    }
    return (<>
        <ScrollArea
            className="h-[600px] overflow-y-auto">
            {children}
            <div className="p-3">
                <h2 className="text-black text-lg font-semibold mb-3">인기있는 오픈채팅방</h2>
                <ChatCategory setCategory={setCategory} />
                <div
                    className="flex flex-col w-full h-full mt-5">
                    {data?.pages.map((page, index) => {
                        return (<div
                            key={index}>
                            {page.data?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            console.log('채팅방 가져오기 성공!');
                                        }}
                                        key={index}
                                        ref={ref}>
                                        {/* <ChatCard
                                            key={index}
                                            id={item.id}
                                            index={index}
                                            name={"item.name"}
                                            title={item.title}
                                            member={item.memberIds.length}
                                            categories={item.roomCategories}
                                        /> */}
                                    </div>
                                )
                            })}
                        </div>)
                    })}
                </div>
            </div>
            {isFetchingNextPage && <PaginationLoading />}

        </ScrollArea>
    
    
    </>);
}
export default ChatScrollArea;