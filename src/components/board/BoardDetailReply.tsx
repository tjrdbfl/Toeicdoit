
const BoardDetailReply = ({
    id,writer, content,create,index
}: {
    id:number,
    writer: string,
    content: string,
    create:string,
    index:number
}) => {
    return (<>
        <div className={`${index%2==0? "flex justify-start": "flex justify-end"}`}>
        <div 
        key={id}
        className={`${index%2==0? "bg-blue-50 ":""}rounded-xl shadow-md m-5 p-5 w-[80%] border-slate-50 border-2`}>
            <div className={`flex flex-row gap-x-2 ${index%2==0? "justify-start":"justify-end"}`}>
                <p className="text-black text-[16px] font-medium">
                    By.
                </p>
                <p className="text-blue-500 text-[16px] font-medium">
                    {writer}
                </p>
            </div>

            <div className="mt-3" />
            <p className="text-black text-[16px]">
                {content}
            </p>
            <div className="mt-3" />
            <p
            className={`${index%2==0? "text-start":"text-end"} text-slate-400 text-[14px]`}
            >{create}</p>
        </div>
        </div>
        
    </>);
}
export default BoardDetailReply;