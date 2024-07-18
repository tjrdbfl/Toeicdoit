"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ 
    label,disabled
}: { 
    label: string,
    disabled?:boolean,
 }) { 
    const { pending } = useFormStatus();
    
    return (<>
        <button type="submit"
            className="form_submit_btn"
            aria-disabled={pending}
            disabled={pending || disabled}
        >
            {label}
        </button>
    </>);

}