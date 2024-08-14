import { chatCategory } from "@/constants/chat/constant";

export function ChatRoomPhoto(category:string|undefined){
    let photo:string='';

    if(category===undefined){
        return '/images/part/part7.png';
    }
    switch (category.toLocaleUpperCase()) {
        case `${chatCategory[0].category}`: return '/images/part/part1.png';
        case `${chatCategory[1].category}`: return '/images/part/part2.png';
        case `${chatCategory[2].category}`: return '/images/part/part3.png';
        case `${chatCategory[3].category}`: return '/images/part/part4.png';
        case `${chatCategory[4].category}`: return '/images/part/part5.png';
        case `${chatCategory[5].category}`: return '/images/part/part6.png';
        default: return '/images/part/part7.png';
    }
}

export function ChatUserPhoto(id:number){
    let photo:string='';
    
    switch (id%3) {
        case 0: return '/images/dashboard/people-01.png';
        case 1: return '/images/dashboard/people-02.png';     
        case 2: return '/images/dashboard/people-03.png';     
        default:
    }

    return photo;
}

export function getChatCategoryTitle(category:string){
    
    switch(category.toLocaleUpperCase()){
        case `${chatCategory[0].category}`: return chatCategory[0].title; 
        case `${chatCategory[1].category}`: return chatCategory[1].title; 
        case `${chatCategory[2].category}`: return chatCategory[2].title; 
        case `${chatCategory[3].category}`: return chatCategory[3].title; 
        case `${chatCategory[4].category}`: return chatCategory[4].title; 
        case `${chatCategory[5].category}`: return chatCategory[5].title; 
        default: return chatCategory[5].title;
    }
}

export function classifyAMPM(time:string):string{
    return time===undefined ? '':Number(time)>=12 && Number(time)<=23 ? '오후':'오전';
}