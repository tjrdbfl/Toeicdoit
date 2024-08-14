"use client";
import { PartDescriptionList } from "@/constants/part/part-description";
import Image from "next/image";
import Link from "next/link";
import ScrollRightBtn from "../button/ScrollRightBtn";
import ScrollLeftBtn from "../button/ScrollLeftBtn";
import { useRef, useState } from "react";

const PartCard = () => {
    const scrollRef = useRef<HTMLUListElement | null>(null);

    return (<>
        <div className="flex items-center justify-center mr-2">
            <ScrollLeftBtn scrollRef={scrollRef} />
        </div>

        <ul
            ref={scrollRef}
            className="flex flex-row w-full py-5 gap-8 overflow-x-auto scrollbar-hide">

            {
                PartDescriptionList.map((item) => (
                    <Link
                        key={item.id}
                        className="p-7 flex justify-center bg-blue-50 rounded-2xl shadow-lg ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-slate-50 hover:rounded-[40px] transition-transform duration-300"
                        href={`/part/${item.id}`}
                    >
                        <div className="w-[230px] h-[340px] rounded-xl flex flex-col justify-between">
                            <div className="flex flex-col gap-y-2">
                            <h2 className=" text-xl rounded-xl font-semibold
                                    bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                    ">Part {item.id}</h2>
                            <div className="mt-3" />
                            <h3 className="text-black text-md">{item.title}</h3>
                            <div className="mt-5" />
        
                            </div>
                             <h4 className="text-slate-400 text-[14px]">{item.subtitle}</h4>
                            <div className="mt-3" />
                            <div className="object-fill flex justify-center">
                                <Image loading="lazy"
                                    src={item.src}
                                    alt={`part ${item.id} image`}
                                    width={200}
                                    height={250}
                                    className="itmes-end w-[200px] h-[120px]"
                                />
                            </div>
                        </div>
                    </Link>
                ))
            }

        </ul>
        <div className="flex items-center justify-center ml-2">
            <ScrollRightBtn scrollRef={scrollRef} />
        </div>
    </>);
}
export default PartCard;