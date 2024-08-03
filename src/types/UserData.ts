
export type UserData={
    id:number|string|undefined;
    email:string;
    password:string;
    profile:string;
    name:string;
    phone:string;
    toeicLevel:number;
    registration:string;
    oauthId:string;
    role:string;
    calendarId:number;
    createdAt:Date;
    updatedAt:Date;
}

export type UserDataPublic={
    email:UserData['email'];
    phone:UserData['phone'];
    profile:UserData['profile'];
    name:UserData['name'];
    toeicLevel:UserData['toeicLevel'];
}
export type UserInfoType={
    userId?:UserData['id'];
    toeicLevel?:UserData['toeicLevel'];
    profile?:UserData['profile'];
    name?:UserData['name'];
}
export interface I_ApiUserLoginRequest {
    email: string;
    password: string;
}
export interface I_ApiUserRegisterRequest {
    email: string;
    password: string;
    phone:string;
    name:string;
}
  