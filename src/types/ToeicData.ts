import { MessageData } from "./MessengerData";

export type ToeicData={
    id:number;
    part:number;
    level:number;
    quesiton:string;
    answer:string;
    numberOfQuestions:number;
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
export type ToeicProblemType={
    id:number,
    question:string,
    description:string,
    image:string,
    take:boolean,
    optionId:OptionData,
    answer:string,
    part:string,
    level:number,
}
export type ToeicProblemData=[{
    id:number,
    sound:string,
    title:string,
    toeicIds:ToeicProblemType[],
    numberOfQuestions:number,
    testType:string,
}];

export type resultChartData={
    BarData:number[],
    score:number,
    lc_score:number,
    rc_score:number,
    timeElapsed:number,
}
export type ToeicDataPublic={
    id:ToeicData['id'],
    question:ToeicData['quesiton'];
    part:ToeicData['part'];
    image:ToeicData['image'];
    sound:ToeicData['sound'];
    numberOfQuestions:ToeicData['numberOfQuestions'];
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

export type ChartData = {
    BarData: number[];     //파트별 점수 합산 
    score: number;       //level 정제 필요 score/100
    LC_score: number;
    RC_Score: number;
    RadarData: number[];     //듣기, 어휘, 구조, 문법, 독해 별 정보
    timeElapsed:number;
}
export const ITEMS_PER_PAGE = 10;
export const CURRENT_TOTAL_PAGE=10;

export interface I_ApiLevelTestRequest{
    currentPage?:number;
    level:number;
}
export interface I_ApiLevelTestResponse{
    totalPages?:number;
    questions:ToeicDataPublic;
    success:boolean;
    message?:MessageData;
}
