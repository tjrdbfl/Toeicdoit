'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { uploadFiles } from "@/service/auth/actions";
import { ERROR } from "@/constants/enums/ERROR";
import { handleError } from "@/service/utils/error";
import { useUserInfoStore } from "@/store/auth/store";

interface DropzoneProps {
    url: string;
    onUploadSuccess?: (file: File) => void;
}
export interface UploadMessage {
    message: string;
}
const initialState: UploadMessage = {
    message: "",
}
export default function ProfileForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [click, setClick] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(uploadFiles, initialState);

    const handleClose = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('profile');
        router.push(`${pathname}/${params.toString()}`);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            console.log('previewUrl: ' + previewUrl);
        }
    }

    useEffect(() => {
        if (state.message === 'SUCCESS') {
            useUserInfoStore.setState({
                profile: previewUrl || ''
            });
            handleClose();
        } else {
            handleError(state.message);
        }
    }, [state.message, click]);

    return (

        <dialog className="fixed inset-0 flex items-center justify-center"
        style={{ backdropFilter: 'blur(5px)', zIndex: 50 }}>
            <div
                className="z-20 bg-white w-[400px] h-auto shadow-md border-slate-100 border-2 p-4 rounded-xl"
            >
                <form
                    action={formAction}
                    >
                    <div className="w-full flex justify-end mb-2">
                        <button
                            onClick={handleClose}>
                            <Image loading="lazy"
                                src={"/svgs/icons/close-icon.svg"}
                                alt={"close-icon"}
                                width={30}
                                height={30}
                                className=" rounded-full hover:bg-slate-100 p-1" />
                        </button>
                    </div>
                    <label htmlFor="profile"
                        className="border-slate-200 border-dashed border-2 p-3 flex justify-center items-center flex-col">
                        {previewUrl ? <Image loading="lazy"
                            src={previewUrl}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px]" /> :

                            <Image loading="lazy"
                                src={'/svgs/icons/cloud-upload-icon.svg'}
                                alt={'upload-icon'}
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px]"
                            />
                        }

                        <div
                            className="flex flex-col items-center justify-center cursor-pointer mx-auto">
                            Upload file
                            <input type="file" id='profile' name='profile' accept="image/*" className="hidden" onChange={handleImageChange} />
                            <p className=" text-slate-300 mt-2 text-[14px]">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                        </div>

                    </label>

                    <button
                        className="w-full rounded-lg font-medium bg-white text-[14px] border-slate-100 border-2 shadow-md hover:bg-slate-50 p-2 mt-5 mb-2"
                        type='submit'
                        disabled={pending}
                        onClick={() => setClick(!click)}>프로필 수정</button>
                </form>

            </div>

        </dialog>
    );
}