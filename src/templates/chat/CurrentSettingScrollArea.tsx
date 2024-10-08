'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchChatRoom, findUserChatRoom } from "@/service/chat/actions";
import { ScrollArea } from "@/components/utils/ScrollArea";
import SettingCard from "@/components/chat/SettingCard";
import { getUserIdInCookie } from "@/service/utils/token";


const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

const CurrentSettingScrollArea = () => {
    
    const [category, setCategory] = useState<string>('all');
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
        
    };
    const [userId, setUserId] = useState('');

    const { data, error, status, fetchNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['UserChatRooms', category],
            queryFn: ({ pageParam = 0 }) => findUserChatRoom({ pageParam, category }),
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    useEffect(() => {
        refetch();
    }, [category]);

    if (error) {
        alert(error.message);
    }
    
    return (<>
        <div
            className="w-[400px]">
                
            <select
                name="category"
                id="category"
                className="block rounded-lg"
                onChange={handleCategoryChange}
            >
                <option value={'all'}>전체</option>
                <option value={'study'}>스터디 모집</option>
                <option value={'FREE'}>수다방</option>
                <option value={'UNI'}>대학생</option>
                <option value={'WORK'}>회사원</option>
                <option value={'SEEK'}>취준생</option>
                <option value={'ETC'}>기타</option>
            </select>

        </div>
        <ScrollArea className="h-[300px] overflow-y-auto p-3">
        <div
                    className="flex flex-col w-full h-full mt-5 pr-5">
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
                                        <SettingCard
                                           chat={item}
                                           type='user'
                                        />
                                    </div>
                                )
                            })}
                        </div>)
                    })}
                </div>
            {isFetchingNextPage && <PaginationLoading />}
            
        </ScrollArea>
                   
    </>);
}
export default CurrentSettingScrollArea;