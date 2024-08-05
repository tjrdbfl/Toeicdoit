import { MessageData } from "./MessengerData";

export type BoardData={
    id:number;
    title:string;
    content:string;
    userId:number;
    writerName:string;
    type:'공지'|'자유'|'문의';
    category?:string;
    createdAt:Date;
    updatedAt:Date;
    reply?:ReplyData[];
}
export type ReplyData={
    id:number;
    content:string;
    writer:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface I_ApiBoardRequest{
    type?:'공지'|'자유'|'문의';
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
