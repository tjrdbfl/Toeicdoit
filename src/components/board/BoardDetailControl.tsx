'use client';
import GoBackBtn from "@/components/button/GoBackBtn";
import GoForwardBtn from "@/components/button/GoForwardBtn";

const BoardDetailControl=({
    id
}:{
    id:number;
})=>{
    
    return(<>
     <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
        <div className="flex flex-row justify-between">
            <GoBackBtn id={id} />
            <GoForwardBtn id={id}/>
        </div>

    </>);
}
export default BoardDetailControl;