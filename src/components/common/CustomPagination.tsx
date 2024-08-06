'use client';

import { generatePagination, getLeftDoublePage, getRightDoublePage } from "@/service/utils/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationArrow } from "../utils/PaginationArrow";
import PaginationNumber from "../utils/PaginationNumber";
import { useEffect, useState } from "react";
import { useBoardCurrentPageStore } from "@/store/board/store";

export default function CustomPagination({ type,totalPages,page }: {
    totalPages: number | 0,type:'double'|'single'
    ,page:number
}) {
    const [isClient, setIsClient] = useState(false);

    useBoardCurrentPageStore.setState({
        currentPage:page
    });
            
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    const allPages = generatePagination(currentPage, totalPages);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (<>
        <div className="inline-flex">
            <div className="flex flex-row gap-x-2">
                {isClient && <>
                   {type==='double' && <PaginationArrow
                        href={createPageURL(getLeftDoublePage(currentPage))}
                        direction={"doubleleft"}
                        isDisabled={currentPage <= 1} 
                        type={type}                    
                        />}
                    <PaginationArrow
                        href={createPageURL(currentPage - 1)}
                        direction={"left"}
                        isDisabled={currentPage <= 1} 
                        type={type}                    
                        />
                </>}
            </div>

            {type==='double'&& <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';

                    return (<PaginationNumber
                        key={page}
                        page={page}
                        href={createPageURL(page)}
                        position={position}
                        isActive={currentPage === page}
                    />);
                })}
            </div>}

            <div className="flex flex-row gap-x-2">
                {isClient &&
                    <>
                        <PaginationArrow
                        href={createPageURL(currentPage + 1)}
                        direction={"right"}
                        isDisabled={currentPage >= totalPages} 
                        type={type}                       
                         />
                        {type==='double' && <PaginationArrow
                        href={createPageURL(getRightDoublePage(currentPage, totalPages))}
                        direction={"doubleright"}
                        isDisabled={currentPage === totalPages} 
                        type={type}                        
                        />}
                    </>}

            </div>
        </div>
    </>);
}