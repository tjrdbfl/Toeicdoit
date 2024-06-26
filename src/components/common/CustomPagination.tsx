'use client';

import { generatePagination, getLeftDoublePage, getRightDoublePage } from "@/lib/utils/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationArrow } from "../utils/PaginationArrow";
import PaginationNumber from "../utils/PaginationNumber";

export default function CustomPagination({totalPages}:{
    totalPages:number|0
}){
    const pathname=usePathname();
    const searchParams=useSearchParams();
    const currentPage=Number(searchParams.get('page'))||1;

    const createPageURL=(pageNumber:number|string)=>{
        const params=new URLSearchParams(searchParams);
        params.set('page',pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    const allPages=generatePagination(currentPage,totalPages);
        
    return(<>
     <div className="inline-flex">
        <div className="flex flex-row gap-x-2">
        <PaginationArrow 
        href={createPageURL(getLeftDoublePage(currentPage))} 
        direction={"doubleleft"}      
        isDisabled={currentPage<=1}  
        />
        <PaginationArrow 
        href={createPageURL(currentPage-1)} 
        direction={"left"}
        isDisabled={currentPage<=1}
        />
    </div>

    <div className="flex -space-x-px">
        {allPages.map((page,index)=>{
            let position:'first'|'last'|'single'|'middle'|undefined;
            
            if (index ===0 ) position='first';
            if (index===allPages.length-1) position='last';
            if (allPages.length===1) position='single';
            
            return(<PaginationNumber 
                key={page}
                page={page} 
                href={createPageURL(page)} 
                position={position}
                isActive={currentPage === page}            
            />);
        })}
    </div>

<div className="flex flex-row gap-x-2">
    <PaginationArrow 
    href={createPageURL(currentPage+1)} 
    direction={"right"}
    isDisabled={currentPage>=totalPages}
    />
    <PaginationArrow 
    href={createPageURL(getRightDoublePage(currentPage))} 
    direction={"doubleright"}
    isDisabled={currentPage>=totalPages}
    />

    </div>
    </div>
    </>);
}