import cookie from 'cookie';

export function getUserData(){
    const cookies=cookie.parse(document.cookie);
    const {userData}=cookies;
    
    if(!userData || typeof userData !=='string')
        return null;

    try{
        return JSON.parse(userData);
    }catch(error){
        return null;
    }
}