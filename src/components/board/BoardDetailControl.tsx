'use client';
import GoBackBtn from "@/components/button/GoBackBtn";
import GoForwardBtn from "@/components/button/GoForwardBtn";

const BoardDetailControl=({
    id,type,totalElements
}:{
    id:number;
    type:string;
    totalElements:number;
})=>{
    
    return(<>
     <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
        <div className="flex flex-row justify-between">
            <GoBackBtn id={id} type={type}/>
            <GoForwardBtn id={id} type={type} totalElements={totalElements}/>
        </div>

    </>);
}
export default BoardDetailControl;