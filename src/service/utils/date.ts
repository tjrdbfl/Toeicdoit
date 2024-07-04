export function formattedTime(timeLeft:number){
    return new Date(timeLeft).toISOString().slice(11, 19);
}

