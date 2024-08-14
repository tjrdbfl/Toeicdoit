import Search from "@/components/common/Search";
import CustomPagination from "@/components/common/CustomPagination";
import { Suspense } from "react";
import { CommonHeader } from "@/config/headers";
import BoardLoading from "@/components/board/BoardLoading";
import BoardTable from "@/components/board/BoardTable";
import { BoardData, I_ApiBoardResponse } from "@/types/BoardData";
import { SERVER, SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import MainHeader from "@/components/common/MainHeader";


export default async function NoticePage({ searchParams }: {
    searchParams?: {
        search?: string;
        page: string;
    }
}) {
    const search = searchParams?.search || '';
    const currentPage = Number(searchParams?.page) || 1;
    let totalPages: number = 0;
    let notices: BoardData[] = [];
    let totalElements:number=0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.USER}/public/${SERVER_API.BOARD}/findBy?title=${search}&type=notice&page=${currentPage - 1}&size=10`, {
            method: 'GET',
            headers: CommonHeader,
            next: { revalidate: 60 * 60 }
        });
        
        const data: I_ApiBoardResponse = await response.json();

        if (data) {
            notices = data.content;
            totalPages = data.totalPages;
            totalElements=data.totalElements;
        } else {
            console.error('Failed to get response data by find-by-types' + ERROR.SERVER_ERROR);
        }


    } catch (err) {
        console.log('Failed to get notice: ', err);
    }

    return (<>
        <div className="w-full flex flex-col py-28 lg:py-[10%] xl:py-[10%] 2xl:py-[5%] px-20 xl:px-[10%]">
            <div className="xl:px-40">
                <MainHeader label={"공지사항"} />
                <div className="mt-4 flex items-center md:mt-8">
                    <Search placeholder={"검색어를 입력해주세요."} />
                </div>
                <Suspense key={search + currentPage} fallback={<><BoardLoading /></>}>
                    <BoardTable boards={notices} type={"notice"} totalElements={totalElements} page={currentPage}/>
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <CustomPagination type='double' totalPages={totalPages} page={currentPage}/>
                </div>
            </div>
        </div>
    </>);
}