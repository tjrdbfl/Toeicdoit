import { PartDescriptionList } from "@/constants/part/part-description";
import Image from "next/image";
import Link from "next/link";

const PartCard=()=>{
    return(<>
    <ul className="flex flex-row w-full py-5 gap-8 overflow-y-auto scrollbar-hide">
                    {
                        PartDescriptionList.map((item) => (
                            <Link
                                key={item.id}
                                className="p-7 flex justify-center bg-blue-50 rounded-2xl shadow-lg ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-slate-50 hover:rounded-[40px] transition-transform duration-300"
                                href={`/part/${item.id}`}
                            >
                                <div className="w-[350px] h-[430px] rounded-xl flex flex-col justify-between">
                                    <h2 className=" text-3xl rounded-xl font-semibold
                                    bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 bg-clip-text inline-block text-transparent
                                    ">Part {item.id}</h2>
                                    <div className="mt-3"/>
                                    <h3 className="text-black text-xl">{item.title}</h3>
                                    <div className="mt-5"/>
                                    <h4 className="text-slate-400 text-lg">{item.subtitle}</h4>
                                    <div className="mt-3"/>
                                    <div className="object-fill flex justify-center">
                                        <Image 
                                        src={item.src} 
                                        alt={`part ${item.id} image`}
                                        width={250}
                                        height={250}    
                                        className="itmes-end"                                    
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </ul>

    </>);
}
export default PartCard;