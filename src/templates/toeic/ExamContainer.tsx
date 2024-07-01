"use client";
import ToeicPlayer from '@/components/toeic/ToeicPlayer';
import SubmitButton from '@/components/button/SubmitBtn';
import QuestionCard from '@/components/toeic/QuestionCard';
import { submitLevelTest } from '@/service/level/action';
import { fetchItems } from '@/service/level/items';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ExamHeader from '@/components/toeic/exam/ExamHeader';
import ExamControl from '@/components/toeic/exam/ExamControl';
import ExamAnswer from '@/components/toeic/exam/ExamAnswer';
import ExamCard from '@/components/toeic/exam/ExamCard';
import { allParts } from '@/constants/toeic/exam';

const LoadingPage = dynamic(() => import('@/app/loading'), { ssr: false });
const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

export default function ExamContainer({ id }: { id: number }) {

    const [selectedTab, setSelectedTab] = useState(allParts[0].label);
    const [questionNumbers, setQuestionNumbers] = useState<{ [key: string]: number[] }>({});
    const partRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const { data, error, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['items'],
            queryFn: fetchItems,
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    // const { data, error, status, fetchNextPage, isFetchingNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ['questions', id],
    //         queryFn: ({ pageParam = 1 }) => fetchQuestions({ pageParam, level: id }),
    //         initialPageParam: 1,
    //         getNextPageParam: (lastPage) => lastPage.nextPage,
    //     });

    const handleTabClick = (label: string) => {
        setSelectedTab(label);
        const partRef = partRefs.current[label];
        if (partRef) {
            partRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const setPartRef = useCallback((label: string) => (el: HTMLDivElement | null) => {
        partRefs.current[label] = el;
      }, []);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (<>


        {status === 'pending' ? (
            <LoadingPage />
        ) : status === 'error' ? (
            <div>{error.message}</div>
        ) : (
            <>
                <div className='fixed top-0 w-full'>
                    <ExamHeader />
                    <ExamControl />
                    <ExamAnswer />
                    <nav className="flex w-[900px] ">
                    <ul className="flex w-[900px] justify-center">
                        {allParts.map((item) => (
                            <li
                                key={item.label}
                                onClick={() => handleTabClick(item.label)}
                                className={`cursor-pointer relative text-lg font-semibold bg-white border-slate-200 border-2 py-1 px-10 shadow-md
                            ${item.label === selectedTab
                                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600 after:transition-all after:duration-200"
                                        : "text-black"
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
                </div>

                <div className="mt-28" />
                
                {data.pages.map((page) => {
                    return (

                        <>
                            <div
                                role="level practice"
                                key={page.currentPage}
                                className="flex flex-col gap-2
                                ml-[20px] w-[700px] 2xl:w-[680px] 2xl:ml-[200px] place-items-start
                                bg-white shadow-md border-slate-200 border-2 rounded-lg">
                                {page.data.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            ref={ref}
                                        >
                                            {/* <ExamCard
                                                    key={item.id}
                                                    toeic={item}
                                                /> */}
                                            <ExamCard
                                                key={item.id}
                                                id={item.id}
                                                question={"item.quesiton"}
                                                image={"/images/dashboard/feature-01.png"}
                                                option={{
                                                    id: item.id,
                                                    choice1: "item.option.choice1",
                                                    choice2: "item.option.choice2",
                                                    choice3: "item.option.choice3",
                                                    choice4: ""
                                                }}
                                                take={true} answer={'a'} />
                                        </div>
                                    );
                                })}
                            </div>
                        </>

                    );

                })}

                {isFetchingNextPage && <PaginationLoading />}
            </>

        )}
    </>);
}