export type MessageData={
    message:string;
    data:Object;
    accessToken:string;
    refreshToken:string;
    accessTokenExpired:number;
    refreshTokenExpired:number;
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