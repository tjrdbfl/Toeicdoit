"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ 
    label,disabled,setClick,click
}: { 
    label: string,
    disabled?:boolean,
    click?:boolean
    setClick?: Dispatch<SetStateAction<boolean>>
 }) { 
    const { pending } = useFormStatus();
    
    return (<>
        <button type="submit"
            className="form_submit_btn"
            aria-disabled={pending}
            disabled={pending || disabled}
            onClick={()=>{
                if(setClick!==undefined){
                    setClick(!click)}
                }
             
            }
        >
            {label}
        </button>
    </>);

}