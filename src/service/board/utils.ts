export function getTypeColor(type:string){
    return type==='1대1 문의'? "text-red-500 font-medium":
    type=='자유게시판'? "text-orange-500 font-medium":
    type==='공지사항'? "text-zinc-500 font-medium":
    "text-black-500";
}