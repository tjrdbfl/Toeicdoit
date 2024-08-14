import Search from "@/components/common/Search";
import ExamLoading from "@/components/exam/ExamLoading";
import ExamTable from "@/components/exam/ExamTable";
import CustomPagination from "@/components/common/CustomPagination";
import { Suspense } from "react";
import { CommonHeader } from "@/config/headers";
import LinkIcon from "@/components/common/LinkIcon";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import MainHeader from "@/components/common/MainHeader";
import { MessageData } from "@/types/MessengerData";
import { findUserInfoById } from "@/service/auth/actions";
import { SERVER_API } from "@/constants/enums/API";

export default async function ExamPage({ searchParams }: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    let totalPages: number = 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/${SERVER_API.TOEIC}/exam`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify({query: query}),
        });

        if (!response) {
            console.error('Failed to get response');
        }

        const data = await response.json();

        if (!data.success) {
            console.error('Failed to fetch exam data: ', data.message);
        }

        totalPages = data.totalPages || 0;
    } catch (error) {
        console.log('Error fetching exam data: ', error);
    }

    return (<>
        <Navbar/>
        <div className="w-full min-h-screen flex flex-col px-16 lg:px-[17%] py-20 ">
            <div className="">
                <MainHeader label={"기출 모의고사"}/>
                <Suspense key={query + currentPage} fallback={<><ExamLoading /></>}>
                    <ExamTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <CustomPagination totalPages={18} type={"double"} page={currentPage} />
                </div>
            </div>
        </div>
        <Footer />
    </>);
}
