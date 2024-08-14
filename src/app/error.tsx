'use client';
import GoBeforeBtn from "@/components/button/GoBeforeBtn";
import { LogoIcon, Logo } from "@/components/common";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {

    const router=useRouter();
    
    return (<>
        <div className="bg-white min-h-screen flex items-center ">
            <div className="flex flex-row w-full total_padding justify-between">

                <div className="flex flex-col w-[40%] gap-y-7 h-full mr-10 py-[20%]">
                    <div className="flex flex-row items-center">
                        <LogoIcon size={49} />
                        <h1 className="font-extrabold text-4xl lg:text-5xl leading-[30.24px] text-[var(--blue2)]">
                            Toeicdoit
                        </h1>
                    </div>
                    <h2 className="text-black text-[25px] lg:text-[30px] font-medium">So Sorry!</h2>
                    <h3 className="text-black text-[20px] lg:text-[25px] leading-snug font-medium">죄송합니다. 내부 서버 오류가 발생했습니다. 다시 시도해주세요.</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-5 mt-5">
                    <div className="lg:w-[300px] w-[150px]">
                            <button 
                            onClick={()=>router.refresh()}
                            className="form_submit_btn p-5 text-balance"
                            >
                                새로 고침 시도하기
                            </button>
                        </div>
                        <div className="lg:w-[300px] w-[150px]">
                            <GoBeforeBtn />
                        </div>
                    </div>

                </div>

                <div
                    className={`w-[45%] object-cover flex items-center justify-center`}
                >
                    <Image
                    loading="lazy"
                        width={1000}
                        height={1000}
                        src='/images/dashboard/feature-main.png'
                        alt="icon"
                        className="object-contain rounded-2xl" />
                </div>
            </div>

        </div>
    </>);
}