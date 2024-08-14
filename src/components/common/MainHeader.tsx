import LinkIcon from "./LinkIcon";

const MainHeader=({label}:{
    label:string
})=>{
    return( 
        <>
        <div className="flex flex-row items-center gap-x-2">
        <LinkIcon size={25}/>
        <h1 className="text-black font-medium text-start text-xl xl:text-2xl">{label}</h1>
        </div>
        </>
    );
}
export default MainHeader;