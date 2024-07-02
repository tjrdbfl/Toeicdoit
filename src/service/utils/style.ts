export function getCategoryColor(category:string){
    return category==='공부법'? "text-blue-500 font-medium":
    category=='문의'? "text-purple-500 font-medium":
    category==='시험후기'? "text-green-500 font-medium":
    "text-purple-500";
}
export function getTypeColor(type:string){
    return type==='1대1 문의'? "text-red-500 font-medium":
    type=='자유게시판'? "text-orange-500 font-medium":
    type==='공지사항'? "text-zinc-500 font-medium":
    "text-purple-500";
}