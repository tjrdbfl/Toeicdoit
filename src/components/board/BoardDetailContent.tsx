import { ScrollArea, ScrollBar } from "@/components/utils/ScrollArea";

const BoardDetailContent = ({content}:{
    content:string
}) => {
    return (<>
        <ScrollArea
            className="sm:h-[500px] xl:h-[600px] py-5"
        >
            <p className="text-black text-xl leading-10 text-balance mr-3 px-3">
                {content}
            </p>
            <ScrollBar />
        </ScrollArea>
    </>);
}
export default BoardDetailContent;