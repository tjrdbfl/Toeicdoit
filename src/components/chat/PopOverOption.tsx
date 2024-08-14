'use client';
import React, { useState, useRef, useEffect } from 'react';

function PopOverOption({
    buttonChildren,
    buttonStyle,
    optionChildren,
}: {
    buttonChildren: React.ReactNode;
    buttonStyle?: string; // Optional for button styling
    optionChildren: React.ReactNode;
}) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setAnchorEl(null);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative">
            <button onClick={handleClick} className={buttonStyle}>
                {buttonChildren}
            </button>
            {open && (
                 <div
                 ref={popoverRef}
                 className="absolute bg-white border border-gray-200 rounded shadow-md z-20"
                 style={{
                     top: anchorEl!.offsetTop + anchorEl!.offsetHeight,
                     right: anchorEl!.offsetLeft,
                 }}
                 onClick={()=>setAnchorEl(null)}
             >
                 {optionChildren}
             </div>
            )}
        </div>
    );
}

export default PopOverOption;
