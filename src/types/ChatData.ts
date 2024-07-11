export type ChatRoomData={
    id:string;
    title:string;
    members:string[];
}
export type ChatData={
    id:string;
    roomId:string;
    senderId:string;
    senderName:string;
    message:string;
    createdAt?:Date;
}
export interface I_ApiChatMsgGetRequest{
    page:number,
    roomId:string,
}
