export function formattedTime(timeLeft:number){
    return new Date(timeLeft).toISOString().slice(11, 19);
}

export function ChatTime(time:number){

    return new Date(time).toISOString().slice(11,13) 
}