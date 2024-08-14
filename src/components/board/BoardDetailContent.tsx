import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";

const BoardDetailContent = ({content}:{
    content:string
}) => {
    return (<>
        <ScrollArea
            className="sm:h-[450px] xl:h-[480px] px-5"
        >
            <p className="text-black text-[17px] leading-10 text-balance mr-3 py-2 px-3">
                {content}
            </p>
            <ScrollBar />
        </ScrollArea>
    </>);
}
export default BoardDetailContent;