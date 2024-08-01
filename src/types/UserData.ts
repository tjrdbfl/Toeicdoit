
export type UserData={
    id:number;
    email:string;
    password:string;
    profile:string;
    name:string;
    phone:string;
    toeicLevel:number;
    registration:string;
    oauthId:number;
    role:string;
    calendarId:number;
    createdAt:Date;
    updatedAt:Date;
}

export type UserDataPublic={
    id:UserData['id'];
    email:UserData['email'];
    phone:UserData['phone'];
    profile:UserData['profile'];
    name:UserData['name'];
    toeicLevel:UserData['toeicLevel'];
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
  