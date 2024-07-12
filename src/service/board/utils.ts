export function getRandomCategory():string{
    const categories = ["이벤트", "알림", "업데이트"];
    const randomIndex=Math.floor(Math.random()*categories.length);

    return categories[randomIndex];
}

export function getTypeColor(type:string){
    return type==='1대1 문의'? "text-red-500 font-medium":
    type=='자유게시판'? "text-orange-500 font-medium":
    type==='공지사항'? "text-zinc-500 font-medium":
    "text-black-500";
}