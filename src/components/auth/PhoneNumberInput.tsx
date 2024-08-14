import { ChangeEvent, RefObject, forwardRef } from "react";

interface PhoneInputProps{
    style:string;
    handle:() => Promise<void>;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneInputProps>(({ handle, style },ref) => {
    return (<>
        <input className={`${style}`}
            ref={ref}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    handle();
                }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = e.target.value.slice(0, 4);
            }}
        />
    </>);
});

PhoneNumberInput.displayName="PhoneNumberInput";

export default PhoneNumberInput;