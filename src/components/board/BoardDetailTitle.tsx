import { getRandomCategory } from "@/service/board/utils";


const BoardDetailTitle = ({
    type, title, category
}: {
    type: string;
    title: string;
    category: string;
}) => (
    <>
        <div className="flex flex-row gap-x-5">

            {type === 'notice' ? <p className={`text-[var(--blue2)] font-medium text-xl md:text-2xl`}>[공지]</p>
                : <p className={`text-[var(--blue2)] font-medium text-xl md:text-2xl`}>[자유]</p>}
            <div className="flex flex-row gap-x-2">
                <p className={`text-xl md:text-2xl ${getRandomCategory() === '이벤트' ? "text-blue-500 font-medium" :
                    getRandomCategory() == '알림' ? "text-purple-500 font-medium" :
                        getRandomCategory() === '업데이트' ? "text-green-500 font-medium" :
                            "text-black-500"}`}
                >{category}</p>
                <h1 className="text-black font-medium text-xl md:text-2xl">
                    {title}
                </h1>
            </div>
        </div>

    </>
);
export default BoardDetailTitle;