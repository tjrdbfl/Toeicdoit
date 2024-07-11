import { MessageData } from "./MessengerData";

export type BoardData={
    id:number;
    title:string;
    content:string;
    type:'notice'|'post'|'customer';
    writer:string;
    category?:string;
    createdAt:Date;
    updatedAt:Date;
    reply?:ReplyData[];
}
export type ReplyData={
    id:number;
    content:string;
    writer:string;
}

export interface I_ApiBoardRequest{
    type?:string;
    query?:string;
    currentPage:number;
    offset:number;
}
export interface I_ApiBoardResponse{
    totalPages:number;
    Boards:BoardData[];
    success:boolean;
    message?:MessageData;
}
export interface I_ApiBoardDetailRequest{
    id:number;
    type:string;
}
export interface I_ApiBoardDetailResponse{
    totalIndex: number;
    Board:BoardData;
    success:boolean;
}
