const LevelHeader=({id}:{
    id:number
})=>{
    return(<>
    <div className="level_header text-black w-full m-10 p-7 text-3xl">
        Level {id}
    </div>
    </>);
}
export default LevelHeader;