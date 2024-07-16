import { getRandomCategory } from "@/service/board/utils";


const BoardDetailTitle=({
    type,title,category
}:{
    type:string;
    title:string;
    category:string;
})=>(
    <>
    <div className="flex flex-row gap-x-5 ">
            {type === 'notice' ? <p className={`text-[#5AB2FF] font-medium text-xl md:text-3xl my-5`}>[공지]</p>
                : <p className={`${getRandomCategory() === '이벤트' ? "text-blue-500 font-medium" :
                    getRandomCategory() == '알림' ? "text-purple-500 font-medium" :
                        getRandomCategory() === '업데이트' ? "text-green-500 font-medium" :
                            "text-black-500"}`}
                            >{category}</p>}
            <h1 className="text-black font-medium text-xl md:text-3xl my-5">
                {title}
            </h1>
        </div>

    </>
);
export default BoardDetailTitle;