import GoBeforeBtn from "@/components/button/GoBeforeBtn";
import GoToMainPageBtn from "@/components/button/GoToMainPageBtn";
import { LogoIcon, Logo } from "@/components/common";
import Image from "next/image";

export const metadata = {
    title: "Toeicdoit - Not Found Page",
    description: "",
};
export default function NotFoundPage() {
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
                    <h2 className="text-black text-3xl lg:text-4xl font-medium">So Sorry!</h2>
                    <h3 className="text-black text-2xl lg:text-3xl leading-snug font-medium">The page you are looking for cannot be found</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-5 mt-5">
                        <div className="lg:w-[300px] w-[150px]">
                            <GoToMainPageBtn />
                        </div>
                        <div className="lg:w-[300px] w-[150px]">
                            <GoBeforeBtn />
                        </div>
                    </div>

                </div>

                <div
                    className={`w-[45%] object-cover flex items-center justify-center`}
                >
                    <Image loading="lazy"
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