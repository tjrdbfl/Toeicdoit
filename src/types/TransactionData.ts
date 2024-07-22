export type CalenderModel={
    id:number;
    title:string;
    isAllDay:boolean;
    userId:number;
    start:Date;
    end:Date;    
}
export interface IEvent{
    title?: string, 
    allDay?: boolean, 
    start?: Date | string,
    end?: Date | string,
    id?: number,
    userId?: number|string,
    endTime?: Date,
    startTime?: Date | string,
}

export type OptionType={
    id: number|null;
    title: string;
    message: string 
}

