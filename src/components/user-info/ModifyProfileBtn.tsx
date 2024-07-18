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
    const searchParams=useSearchParams().get('profile');

    return (<>
        <div className='flex flex-col'>
            <div className={`object-fill md:w-[120px] rounded-full mb-5`}>
                {profile === '' ?
                    <Image
                        src={'/svgs/icons/account-icon.svg'}
                        alt={'account-icon'}
                        width={300}
                        height={300}
                    /> : <>
                        <Image
                            src={profile}
                            alt={'Profile'}
                            width={300}
                            height={300}
                        />
                    </>}
            </div>
            <Link
            href={'?profile=true'}
            className='bg-white text-black text-xl border-slate-100 border-2 ring-offset-4 ring-slate-100 shadow-lg ring-2 rounded-xl p-3 hover:bg-slate-50'
            >
                프로필 수정
            </Link>
            {searchParams==='true' && <ProfileForm/>}

        </div>
    </>);
}
export default ModifyProfileBtn;