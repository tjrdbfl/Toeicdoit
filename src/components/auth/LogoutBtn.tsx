'use client';

import { store } from "@/redux";
import { clearUserData } from "@/store/auth/user-slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";

const LogoutBtn=()=>{
    
    const dispatch=useDispatch();
    const router=useRouter();
    const persistor=persistStore(store);

    const onClick=async()=>{
        //cookie delete 역시 필요 
        // fetch('/api/logout',{
        //     method:'GET',
        // }).then(res=>{
        //     if(res.ok){
        //         setIsLoggedOut(true);
        //         setUserData(null);
        //         window.location.replace('/');
        //     }
        // }).catch(()=>{
        //     console.error('Something went wrong!');
        // }).finally(()=>{
        //     setIsLoading(false);
        // })
        console.log('dispatch');
        dispatch(clearUserData());
        console.log('flush');
        await persistor.purge();
        router.refresh();
    };

    return(<>
    <button className="text-black navSidebar_p font-semibold"
    onClick={onClick}>로그아웃</button>
    </>);
}
export default LogoutBtn;