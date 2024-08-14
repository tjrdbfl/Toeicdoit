import { MessageData } from "./MessengerData";

export type BoardData={
    id:number;
    title:string;
    content:string;
    userId:number;
    writerName:string;
    type:'notice'|'free'|'request';
    category?:string;
    createdAt:Date;
    updatedAt:Date;
    replyIds?:ReplyData[];
}
export type ReplyData={
    id:number;
    content:string;
    writerName:string;
    boardTitle:string;
    createdAt:Date;
    updatedAt:Date;
    boardId:number;
    userId:number;
}

export interface I_ApiBoardRequest{
    type?:'notice'|'free'|'request';
    search?:string;
    currentPage:number;
}
export interface I_ApiBoardResponse{
    totalPages:number;
    totalElements:number;
    content:BoardData[];
}
export interface I_ApiBoardDetailRequest{
    id:number;
    type:string;
}
export interface I_ApiBoardDetailResponse{
    totalIndex: number;
    Board:BoardData;
}

export interface I_ApiBoardSaveRequest {
    userId:number,
    title: string;
    content: string;
    type: string;
    category:string;
}
