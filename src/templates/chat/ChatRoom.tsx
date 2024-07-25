'use client'
import { ChatData } from "@/types/ChatData";
import ChatMessage from "@/components/chat/ChatMessage";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "@/service/toeic/items";
import { useInView } from "react-intersection-observer";
import { useFormStatus } from "react-dom";
import { fetchChatMessage } from "@/service/chat/actions";
import ChatMessageContainer from "./ChatMessageContainer";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { useChatAlertStore } from "@/store/chat/store";
import { ERROR } from "@/constants/enums/ERROR";
import NewMessage from "@/components/chat/NewMessage";

const ChatRoom = ({
    chat
}: {
    chat: ChatData,
}) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatData[]>([]);
    const [currentScrollTop, setCurrentScrollTop] = useState(0);
    const [newMsg,setNewMsg]=useState<string>('');
    const { ref, inView } = useInView({
        rootMargin: "-200px 0px 0px 0px",
    });

    // const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    //     queryKey: ['items'],
    //     queryFn: fetchItems,
    //     initialPageParam: 1,
    //     getNextPageParam: (lastPage) => lastPage.nextPage,
    // });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['chatMessages'],
        queryFn: ({pageParam=1})=>fetchChatMessage({pageParam,roomId:chat.roomId}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage?.nextPage
    });

    //처음 채팅창에 들어왔을 때 scroll area의 하단으로 focus     
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight })
        }
    }, []);

    useEffect(() => {
        if (!inView) return;

        // 스크롤 위치 저장
        if (scrollRef.current) {
            setCurrentScrollTop(scrollRef.current.scrollTop);
        }

        //데이터 로드
        fetchNextPage().then(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: currentScrollTop });
            }
        })
    }, [inView]);

    // // 스크롤 이벤트 핸들러
    // const handleScroll = () => {
    //     if (scrollRef.current) {
    //         setCurrentScrollTop(scrollRef.current.scrollTop);
    //         console.log('currentScrollTop: ' + currentScrollTop);
    //         console.log('scrollHeight: ' + scrollRef.current.scrollHeight);

    //         if (scrollRef.current.scrollTop === 0 && !isFetchingNextPage) {

    //             fetchNextPage()
    //                 .then(() => { scrollRef.current?.scrollTo({ top: currentScrollTop }) }); // 데이터 가져오기 완료 후 스크롤 위치 복원
    //         }
    //     }
    // };

    // useEffect(() => {
    //     scrollRef.current?.addEventListener('scroll', handleScroll);
    //     return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
    // }, [handleScroll]); 

    // EventSource 연결 및 메시지 업데이트
    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/${SERVER.CHAT}/${SERVER_API.ROOM}/receive/${chat.roomId}`);

        eventSource.onopen = () => {
            console.log("SSE connection open");
        };

        eventSource.onmessage = (event) => {
            try {
                const newMessage: ChatData = JSON.parse(event.data);
                setNewMsg(newMessage.message);
                console.log("newMessage: " + newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } catch (err) {
                useChatAlertStore.setState({
                    fadeOut: true,
                    message: ERROR.SERVER_ERROR
                });
                console.error("Failed to parse message", err);
            }
        };

        eventSource.onerror = (e) => {
            useChatAlertStore.setState({
                fadeOut: true,
                message: ERROR.SERVER_ERROR
            });
            console.error("SSE error", e);
            eventSource.close();
        }

        return () => {
            eventSource.close();
        }
    }, []);

    //메세지 배열 업데이트
    useEffect(() => {
        if (data) {
            const allMessages = data.pages
            .flatMap((page) => page?.data||[]);
            if(allMessages.length!==0){
                setMessages(allMessages);
            }
        }
    }, [data]);

    return (<>
        <div
            ref={scrollRef}
            className="overflow-y-auto h-[500px] mt-5 mb-4 scroll-area-chat p-2">

            <div
                ref={ref}
                className="flex flex-col gap-y-7">
                {/* {data?.pages.slice().reverse().map((page) => {
                    return (
                        <div
                            ref={ref}
                            key={page.currentPage}
                            className="flex flex-col gap-y-7"
                        >
                            {page.data.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                    >
                                        <ChatMessage chat={{
                                            id: item.id.toString(),
                                            roomId: "",
                                            senderId: "admin",
                                            senderName: item.id.toString(),
                                            message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
                                            createdAt: new Date(),
                                        }} />

                                    </div>);
                            })}
                        </div>
                    );
                })} */}
                {messages.map((msg)=>(
                    <ChatMessage 
                    key={msg.id}
                    chat={msg}/>
                ))}
            </div>
        </div>
            <NewMessage ref={scrollRef}/>
        <ChatMessageContainer chat={chat} />

    </>);
}
export default ChatRoom;