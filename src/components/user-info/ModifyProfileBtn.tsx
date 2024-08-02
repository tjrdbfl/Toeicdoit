'use client';
import ProfileForm from '@/templates/auth/ProfileForm';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';

const ModifyProfileBtn = ({ profile }: {
    profile: string;
}) => {
    const searchParams = useSearchParams().get('profile');

    return (<>
        <div className='flex flex-col justify-center items-center my-4'>
            {profile === '' ?
                <Image
                    src={'/svgs/icons/account-icon.svg'}
                    alt={'account-icon'}
                    width={300}
                    height={300}
                    className='w-[70px] h-[70px] rounded-full mb-2'
                /> : <>
                    <Image
                        src={'http://dummyimage.com/243x100.png/ff4444/ffffff'}
                        alt={'Profile'}
                        width={300}
                        height={300}
                        className='w-[70px] h-[70px] rounded-full mb-2'
                    />
                </>}
            <Link
                href={'?profile=true'}
                className='bg-white text-center border-slate-100 border-2 shadow-md rounded-lg py-2 text-[14px] px-4'
            >
                프로필 수정
            </Link>
            {searchParams === 'true' && <ProfileForm />}

        </div>
    </>);
}
export default ModifyProfileBtn;