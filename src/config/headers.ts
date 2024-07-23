// export const CommonHeader=(token:string)=>(
//      {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin':'*',
//           'Authorization': `Bearer ${token}` ,
//      }
// );
export const CommonHeader = {
     'Content-Type': 'application/json',
}

export const AuthorizeHeader=(token:string|undefined)=>{
     
     return({
          "Cache-Control":"no-cache",
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`,
          "Access-Control-Allow-Origin":"*"
     });
}
    
