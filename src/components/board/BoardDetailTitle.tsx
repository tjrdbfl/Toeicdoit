
const BoardDetailTitle = ({
    type, title, category
}: {
    type: string;
    title: string;
    category: string;
}) => (
    <>
        <div className="flex flex-row gap-x-5 ">

            {type === 'notice' ? <p className={`text-[var(--blue2)] font-medium text-lg md:text-xl`}>[공지]</p>
                : <p className={`text-[var(--blue2)] font-medium text-lg md:text-xl`}>[자유]</p>}
            <div className="flex flex-row gap-x-2">
                {type === 'free' ? <p className={` text-lg md:text-xl ${category === '시험 후기' ? "text-blue-500 font-medium" :
                    category == '자료 공유' ? "text-purple-500 font-medium" :
                        "text-green-500 font-medium"}`}>{category}</p>
                    : <>
                        <p className={` text-lg md:text-xl ${category === '이벤트' ? "text-blue-500 font-medium" :
                            category == '공지' ? "text-purple-500 font-medium" :
                                "text-green-500 font-medium"}`}>{category}</p>
                    </>}
                <h1 className="text-black font-medium text-lg md:text-xl">
                    {title}
                </h1>
            </div>
        </div>

    </>
);
export default BoardDetailTitle;