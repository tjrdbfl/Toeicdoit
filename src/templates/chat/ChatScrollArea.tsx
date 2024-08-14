'use client';

import ChatCard from "@/components/chat/ChatCard";
import ChatCategory from "@/components/chat/ChatCategory";
import { useInfiniteQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchChatRoom } from "@/service/chat/actions";
import { ScrollArea } from "@/components/utils/ScrollArea";


const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

const ChatScrollArea = ({ children }: {
    children: React.ReactNode
}) => {
    const [category,setCategory]=useState<string>('all');
    
    const { data, error, status, fetchNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['chatRooms',category],
            queryFn: ({ pageParam = 0 }) => fetchChatRoom({ pageParam,category }),
            initialPageParam: 0,
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
                                        <ChatCard
                                            key={index}
                                            chat={item}
                                            />
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