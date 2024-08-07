export type MessageData={
    message:string;
    state?:boolean;
    count?:number;
    data:Object;
}
export type PayloadData={
    sub:string;
    iss:string;
    roles:string[];
    type:string;
    iat:number;
    exp:number;
    id:number;
}
export interface FreeMessageState {
    message: {
        title?: string[] | undefined;
        category?: string[] | undefined;
        content?: string[] | undefined;
    };
    result_message: string;
}
export const initialFreeMessageState: FreeMessageState = {
    message: {
        category: "" || undefined,
        title: "" || undefined,
        content: "" || undefined,
        
    },
    result_message: ""
};
export interface MessageState{
    message:string;
}
export const initialMessageState:MessageState={
    message:""
}