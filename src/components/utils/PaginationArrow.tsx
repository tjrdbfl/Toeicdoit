import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Link from 'next/link';
import clsx from 'clsx';

export function PaginationArrow({
    href, direction, isDisabled
}: {
    href: string;
    direction: 'left' | 'right' | 'doubleleft' | 'doubleright';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border shadow-md',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        },
    );

    const icon =
        direction === 'left'
            ? <KeyboardArrowLeftIcon className="w-8 text-slate-500" />
            : direction === 'doubleleft'
                ? <KeyboardDoubleArrowLeftIcon className="w-8 text-slate-500" />
                : direction === 'right'
                    ? <KeyboardArrowRightIcon className="w-8 text-slate-500" />
                    : <KeyboardDoubleArrowRightIcon className="w-8 text-slate-500" />;

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}