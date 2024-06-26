import { getCategoryColor } from "@/lib/utils/style";

const BoardDetailTitle=({
    type,categoryId,title,category
}:{
    type:string;
    categoryId:number;
    title:string;
    category:string;
})=>(
    <>
    <div className="flex flex-row gap-x-5 ">
            {type === 'notice' ? <p className={`text-[#5AB2FF] font-medium text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl my-5`}>[공지]</p>
                : <p className={`${getCategoryColor(categoryId)} font-medium text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl my-5`}>{category}</p>}
            <h1 className="text-black font-medium text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl my-5">
                {title}
            </h1>
        </div>

    </>
);
export default BoardDetailTitle;