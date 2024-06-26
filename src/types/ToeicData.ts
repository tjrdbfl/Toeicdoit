export type ToeicData={
    id:number;
    part:number;
    level:number;
    quesiton:string;
    answer:string;
    description:string;
    image:string;
    sound:string;
    script:string;
    createdAt:Date;
    updatedAt:Date;
    title:string;
    take:boolean;
    option:OptionData;
    result:ResultData;
}
export type OptionData={
    id:number;
    choice1:string;
    choice2:string;
    choice3:string;
    choice4:string;
}
export type ResultData={
    id:number;
    result:boolean;
    userAnswer:AnswerData[];
    isCorrect:boolean;
    createdAt:Date;
    updatedAt:Date;
}
export type AnswerData={
    id:number;
    answer:string;
}
export type ToeicDataPublic={
    id:ToeicData['id'],
    question:ToeicData['quesiton'];
    part:ToeicData['part'];
    image:ToeicData['image'];
    sound:ToeicData['sound'];
    option:ToeicData['option'];
    take:ToeicData['take'];
    answer:ToeicData['answer'];
    description:ToeicData['description'];
    script:ToeicData['script'];
}
export type OptionDataPublic={
    id:OptionData['id'];
    choice1:OptionData['choice1'];
    choice2:OptionData['choice2'];
    choice3:OptionData['choice3'];
    choice4:OptionData['choice4'];
}
export const ITEMS_PER_PAGE = 10;
export const CURRENT_TOTAL_PAGE=10;

export interface I_ApiLevelPracticeRequest{
    currentPage?:number;
    level:number;
    offset?:number;
}
export interface I_ApiLevelPracticeResponse{
    questions:ToeicDataPublic[];
    success:boolean;
    message?:string;
}
