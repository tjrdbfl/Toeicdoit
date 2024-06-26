import { ForwardedRef, RefObject, forwardRef } from "react";

interface AuthInputProps {
    placeholder: string;
    label: string;
    handle: () => Promise<void>; // Assuming handle is a callback function
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({ placeholder, label, handle }, 
    ref) => {

    return (<>
        <p className="form_label">{label}</p>
        <input
            className="form_input"
            type="text"
            placeholder={`${placeholder}`}
            ref={ref}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    handle();
                }
            }}
        />
    </>);
});

AuthInput.displayName = "AuthInput";
export default AuthInput;