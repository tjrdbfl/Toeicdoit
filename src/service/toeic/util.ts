import { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, time } from "@/constants/chart/constant";
import { lv0, lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9 } from "@/constants/chart/constant";

export function calculateRadarData(score:number){
    
    switch(Math.floor(score/100)){
        case 0:return lv0;
        case 1:return lv1;
        case 2:return lv2;
        case 3:return lv3;
        case 4:return lv4;
        case 5:return lv5;
        case 6:return lv6;
        case 7:return lv7;
        case 8:return lv8;
        case 9:return lv9;
        default:return;
    }
}

export function calculateBarData(score:number){
    switch(Math.floor(score/100)){
        case 0:return p0;
        case 1:return p1;
        case 2:return p2;
        case 3:return p3;
        case 4:return p4;
        case 5:return p5;
        case 6:return p6;
        case 7:return p7;
        case 8:return p8;
        case 9:return p9;
        default:return p0;
    }
}

export function calculateTimeData(score:number){
    switch(Math.floor(score/100)){
        case 0:return time[0];
        case 1:return time[1];
        case 2:return time[2];
        case 3:return time[3];
        case 4:return time[4];
        case 5:return time[5];
        case 6:return time[6];
        case 7:return time[7];
        case 8:return time[8];
        case 9:return time[9];
        default:return time[0];
    }
}

export function calculateTime(time:number){
    return {hour:Math.floor(time/60),minute:time%60};
}