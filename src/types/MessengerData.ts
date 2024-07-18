export type MessageData={
    message:string;
    data:Object;
    accessToken:string;
    refreshToken:string;
    accessTokenExpired:number;
    refreshTokenExpired:number;
}

export interface MessageState {
    message: {
        title?: string[] | undefined;
        category?: string[] | undefined;
        content?: string[] | undefined;
    };
    result_message: string;
}

export const initialMessageState: MessageState = {
    message: {
        category: "" || undefined,
        title: "" || undefined,
        content: "" || undefined,
    },
    result_message: ""
};