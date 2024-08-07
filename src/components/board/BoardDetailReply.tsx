
const BoardDetailReply = ({
    id,writer, content,create,index,update
}: {
    id:number,
    writer: string,
    content: string,
    create:string,
    index:number,
    update:boolean,
}) => {
    
    return (<div className="w-full">
        <div className={`${index%2==0? "flex flex flex-row  justify-start": "flex flex flex-row-reverse justify-end"} w-full`}>
        <div 
        key={id}
        className={`${index%2==0? "bg-blue-50 ":""}rounded-xl shadow-md m-5 p-5 ${update?'w-[500px]':'w-[600px]'} border-slate-50 border-2`}>
            <div className={`flex flex-row gap-x-2 ${index%2==0? "justify-start":"justify-end"}`}>
                <p className="text-black text-[14px] font-medium">
                    By.
                </p>
                <p className="text-blue-500 text-[14px] font-medium">
                    {writer}
                </p>
            </div>

            <div className="mt-3" />
            <p className="text-black text-[14px]">
                {content}
            </p>
            <div className="mt-3" />
            <p
            className={`${index%2==0? "text-start":"text-end"} text-slate-400 text-[12px]`}
            >{create}</p>
        </div>
        </div>
    </div>);
}
export default BoardDetailReply;