
const BoardDetailReply = ({
    id,writer, content,create
}: {
    id:number,
    writer: string,
    content: string,
    create:Date,
}) => {
    return (<>
        <div className={`${id%2==1? "flex justify-start": "flex justify-end"}`}>
        <div 
        key={id}
        className={`${id%2==1? "bg-blue-50 ":""}rounded-xl shadow-md m-5 p-5 w-[80%]`}>
            <div className={`flex flex-row gap-x-2 ${id%2==1? "justify-start":"justify-end"}`}>
                <p className="text-black text-lg font-medium">
                    By.
                </p>
                <p className="text-blue-500 text-lg font-medium">
                    {writer}
                </p>
            </div>

            <div className="mt-3" />
            <p className="text-black text-lg">
                {content}
            </p>
            <div className="mt-3" />
            <p
            className={`${id%2==1? "text-start":"text-end"} text-slate-400`}
            >{create.getTime()}</p>
        </div>
        </div>
        
    </>);
}
export default BoardDetailReply;