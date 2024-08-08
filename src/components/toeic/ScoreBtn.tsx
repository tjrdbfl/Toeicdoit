"use client";

import { PG } from "@/constants/enums/PG";
import { useResultStore } from "@/store/toeic/store";
import { useRouter } from "next/navigation";

const ScoreBtn=({label,type}:{label:string,type:string})=>{

    const router=useRouter();
    const url=type==='exam'?`${PG.EXAM}`:type==='level'?`${PG.LEVEL}`:type==='part'? `${PG.PART}`:`${PG.LEVEL_TEST}`;

    const handleClick=()=>{
        router.push(url);
        useResultStore.setState({
            BarData:[],
            score:0,
            lc_score:0,
            rc_score:0,
            timeElapsed:0,
            name:'',
            type:'',
        });
        
    }
    
    return(<>
    <button
    onClick={handleClick}
    className="lime_button w-[230px] justify-center p-3"
    >
        <p className="text-black font-semibold">{label}</p>
    </button>
    </>);
}
export default ScoreBtn;