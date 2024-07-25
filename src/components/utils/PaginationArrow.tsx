import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Link from 'next/link';
import clsx from 'clsx';

export function PaginationArrow({
    href, direction, isDisabled,type
}: {
    href: string;
    direction: 'left' | 'right' | 'doubleleft' | 'doubleright';
    isDisabled?: boolean;
    type:'double'|'single'
}) {
    const className = clsx(
        `flex  items-center justify-center ${type==='single'? 'rounded-full bg-zinc-800 h-10 w-10':'rounded-md h-8 w-8'} border shadow-md`,
        { 
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled && type==='double',
            'hover:bg-zinc-500': !isDisabled && type==='single',
            'mr-2 md:mr-4': direction === 'left' && type==='double',
            'ml-2 md:ml-4': direction === 'right' && type==='double',
            'mr-1 md:mr-2': direction === 'left' && type==='single',
            'ml-1 md:ml-2': direction === 'right' && type==='single',

        },
    );

    const icon =
        direction === 'left'
            ? <KeyboardArrowLeftIcon className={` ${type==='single'? 'text-white text-[20px]': ' text-slate-500'}`} />
            : direction === 'doubleleft'
                ? <KeyboardDoubleArrowLeftIcon 
                className={` ${type==='single'? 'text-white text-[20px]': ' text-slate-500 '}`}
                />
                : direction === 'right'
                    ? <KeyboardArrowRightIcon 
                    className={` ${type==='single'? 'text-white text-[20px]': ' text-slate-500 '}`}
                    />
                    : <KeyboardDoubleArrowRightIcon 
                    className={`${type==='single'? 'text-white text-[20px]': ' text-slate-500 '}`}
                    />;

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}