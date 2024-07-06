export type ChatRoomData={
    id:string;
    title:string;
    admins:string[];
    members:string[];
    createdAt:Date;
    updatedAt:Date;
}
export type ChatData={
    id:string;
    roomId:string;
    senderId:string;
    senderName:string;
    message:string;
    createdAt:Date;
    updatedAt:Date;
}