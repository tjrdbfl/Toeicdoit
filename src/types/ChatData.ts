export type ChatRoomData={
    id:string;
    title:string;
    roomCategories:string[];
    adminIds:string[];
    memberIds:string[];
    createdAt:Date;
    updatedAt:Date;
}
export type ChatData={
    id:string;
    roomId:string;
    senderId:string;
    senderName:string;
    message:string;
    createdAt:string;
}
export type Messenger={
    message:string;
    state:boolean;
    count:number;
    data:Object;
}
export interface I_ApiChatMsgGetRequest{
    page:number,
    roomId:string,
}
