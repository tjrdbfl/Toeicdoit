const MyPageBtn=({label,style}:{
    label:string,
    style:string

})=>{
    return(<>
    <button
    className={`bg-white border-slate-100 border-2 ring-offset-4 ring-slate-100 shadow-lg ring-2 rounded-xl p-3 hover:bg-slate-50 ${style}`}
    >
        <p
        className="text-black text-xl"
        >{label}</p>
        </button>
    </>);
}
export default MyPageBtn;