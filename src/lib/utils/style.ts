export function getCategoryColor(id:number){
    return id===1? "text-red-500":
    id===2? "text-green-500":
    id===3? "text-blue-500":
    "text-purple-500";
}