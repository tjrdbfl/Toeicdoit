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
        <div className='flex flex-col justify-center items-center my-4'>
            <div className={`object-fill w-[80px] rounded-full mb-2`}>
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
            className='user_info_btn'
            >
                프로필 수정
            </Link>
            {searchParams==='true' && <ProfileForm/>}

        </div>
    </>);
}
export default ModifyProfileBtn;