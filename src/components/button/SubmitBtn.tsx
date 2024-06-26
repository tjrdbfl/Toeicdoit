"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }: { label: string }) { 
    const { pending } = useFormStatus();
    return (<>
        <button type="submit"
            className="form_submit_btn"
            aria-disabled={pending}
        >
            {label}
        </button>
    </>);

}