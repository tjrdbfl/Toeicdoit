"use client";

import { classifyQuestion, fetchItems } from '@/service/toeic/items';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ExamHeader from '@/components/exam/ExamHeader';

import ExamAnswer from '@/components/exam/ExamAnswer';

import { allParts } from '@/constants/toeic/exam';
import ExamControl from '@/components/exam/ExamControl';
import ExamCard from '@/components/exam/ExamCard';

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

//     // partRefs를 업데이트하는 useEffect 추가
//   useEffect(() => {
//     const newPartRefs: { [key: string]: HTMLDivElement | null } = {};
//     if (data) {
//       data.pages.flatMap(page => page.data).forEach(item => {
//         const partLabel = classifyQuestion(item.id);
//         const existingRef = partRefs.current[partLabel];
//         if (existingRef) {
//           newPartRefs[partLabel] = existingRef;
//         }
//       });
//     }
//     partRefs.current = newPartRefs;
//   }, [data]);

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
                    <nav className="flex lg:mx-[400px]">
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


                {data.pages.map((page) => {
                    return (

                        <>
                            <div
                                role="level practice"
                                key={page.currentPage}
                                className="flex flex-col gap-2 w-[530px] lg:mx-[400px] justify-center mt-28">
                                {page.data.map((item) => {
                                    return (
                                        <div
                                        key={item.id}
                                            ref={setPartRef(`${classifyQuestion(item.id)}`)}
                                        >

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