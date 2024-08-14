'use client'
import { ChatData } from "@/types/ChatData";
import ChatMessage from "@/components/chat/ChatMessage";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { findChatByRoomId } from "@/service/chat/actions";
import ChatMessageContainer from "./ChatMessageContainer";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { useChatAlertStore, useChatNewMessageStore } from "@/store/chat/store";
import { ERROR } from "@/constants/enums/ERROR";
import NewMessage from "@/components/chat/NewMessage";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { ScrollArea } from "@/components/utils/ScrollArea";
import Loading from "@/app/loading";
import PaginationLoading from "@/components/utils/PaginationLoading";
import { AuthorizeHeader } from "@/config/headers";


const ChatRoom = ({
    roomId, token
}: {
    roomId: string,
    token: string | undefined
}) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatData[]>([]);
    const [currentScrollTop, setCurrentScrollTop] = useState(0);
    const [newMsg, setNewMsg] = useState<string>('');
    const { ref, inView } = useInView({
        rootMargin: "0px 0px 0px 0px",
    });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    

    function isScrollAtBottom(scrollRef: React.RefObject<HTMLElement>): boolean {
        if (!scrollRef.current) return false;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const tolerance = 10; // 허용 오차 (픽셀)

        return Math.abs(scrollTop + clientHeight - scrollHeight) <= tolerance;
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['chatMessages'],
        queryFn: ({ pageParam = 0 }) => findChatByRoomId({ pageParam, roomId, createdAt: messages[0].createdAt.replace('Z', "") }),
        initialPageParam: 0,
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

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (scrollRef.current) {
            setCurrentScrollTop(scrollRef.current.scrollTop);

            if (
                scrollRef.current.scrollTop === 0 &&
                !isFetchingNextPage
            ) {
                fetchNextPage().then(() => {
                    if (scrollRef.current) {
                        scrollRef.current.scrollTo({ top: currentScrollTop + 200 }); // 스크롤 위치 조정
                    }
                });
            }
        }
    };

    useEffect(() => {
        scrollRef.current?.addEventListener('scroll', handleScroll);
        return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    //EventSource 연결 및 메시지 업데이트
    useEffect(() => {
        if (token === undefined) {
            alert(ERROR.INVALID_MEMBER);
            return;
        }

        let eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.CHAT}/${SERVER_API.CHAT}/recieve/${roomId}`,
            {
                headers:AuthorizeHeader(token)
                , withCredentials: true
            }
        );

        eventSource.onopen = () => {
            console.log("SSE connection opened");
        };

        eventSource.onmessage = (event) => {
            try {
                const newMessage: ChatData = JSON.parse(event.data);
                if(newMessage.id === "0") {
                    //newMessage.message
                };

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
                .flatMap((page) => page?.data || []);
            // if (allMessages.length !== 0) {
            //     setMessages(allMessages.map((msg) => (
            //         {
            //             id: msg.id.toString(),
            //             roomId: "",
            //             senderId: "admin",
            //             senderName: 'item.id.toString()',
            //             message: "안녕하세요. 처음 오신 걸 환영합니다! 안녕하세요. 처음 오신 걸 환영합니다!",
            //             createdAt: new Date().toISOString(),
            //         }
            //     )));
            // }
        }
        console.log('data: '+data);
    }, [data]);

    useEffect(() => {
        if (scrollRef.current) {

            if (isScrollAtBottom(scrollRef)) {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
                useChatNewMessageStore.setState({
                    fadeOut: true,
                    message: '새 메세지'
                });
            }
        }
    }, [messages]);

    return (<>
        <ScrollArea
            ref={scrollRef}
            className="h-[450px] w-[400px] overflow-y-auto mt-5 mb-3">
            {isFetchingNextPage && <PaginationLoading />}
            <div
                ref={ref}
                className="flex flex-col gap-y-7">
                {data?.pages.slice().reverse().map((page, index) => {
                    return (
                        <div
                            ref={ref}
                            key={index}
                            className="flex flex-col gap-y-7"
                        >
                            {page?.data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                    >
                                        <ChatMessage
                                            key={item.id}
                                            token={token}
                                            chat={item} />

                                    </div>);
                            })}
                        </div>
                    );
                })}
                {messages.map((msg) => (
                    <ChatMessage
                        token={token}
                        key={msg.id}
                        chat={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
        <NewMessage ref={scrollRef} />
        <ChatMessageContainer roomId={roomId} />

    </>);
}
export default ChatRoom;
