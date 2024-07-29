import { chatCategory } from "@/constants/chat/constant";

export function ChatRoomPhoto(category:string){
    let photo:string='';

    switch (category.toLocaleUpperCase()) {
        case `${chatCategory[0].category}`: photo = '/images/part/part1.png'; break;
        case `${chatCategory[1].category}`: photo = '/images/part/part2.png'; break;
        case `${chatCategory[2].category}`: photo = '/images/part/part3.png'; break;
        case `${chatCategory[3].category}`: photo = '/images/part/part4.png'; break;
        case `${chatCategory[4].category}`: photo = '/images/part/part5.png'; break;
        case `${chatCategory[5].category}`: photo = '/images/part/part6.png'; break;
        default: break;
    }


    return photo;
}

export function ChatUserPhoto(id:number){
    let photo:string='';
    
    switch (id%3) {
        case 0: photo = '/images/dashboard/people-01.png'; break;
        case 1: photo = '/images/dashboard/people-02.png'; break;     
        case 2: photo = '/images/dashboard/people-03.png'; break;     
        default: break;
    }


    return photo;
}
