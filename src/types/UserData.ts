
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
    calendarId:0;
    createdAt:Date;
    updatedAt:Date;
}

export type UserDataPublic={
    id:UserData['id'];
    name:UserData['name'];
    oauthId:UserData['oauthId'];
    calendarId:UserData['calendarId'];
    role:UserData['role'];
    toeicLevel:UserData['toeicLevel'];
}

