export type BoardData={
    id:number;
    title:string;
    content:string;
    writer:string;
    create:Date;
    update:Date;
    reply:ReplyData[];
    category?:Category;
}
export type Category={
    id:number;
    category:string;
}
export type ReplyData={
    id:number;
    content:string;
    writer:string;
}
export type BoardDataPublic={
    id:BoardData['id'];
    title:BoardData['title'];
    writer:BoardData['writer'];
    create:BoardData['create'];
    update:BoardData['update'];
    category?:BoardData['category'];
}
export type BoardDetail={
    id:BoardData['id'];
    title:BoardData['title'];
    writer:BoardData['writer'];
    content:BoardData['content'];
    create:BoardData['create'];
    update:BoardData['update'];
    category?:BoardData['category'];
    reply?:BoardData['reply'];
}
export interface I_ApiBoardRequest{
    query:string;
    currentPage:number;
    offset:number;
}
export interface I_ApiBoardResponse{
    totalPages:number;
    Boards:BoardDataPublic[];
    success:boolean;
    message?:string;
}
export interface I_ApiBoardDetailRequest{
    id:number;
}
export interface I_ApiBoardDetailResponse{
    totalIndex: number;
    Board:BoardDetail;
    success:boolean;
    message?:string;
}
