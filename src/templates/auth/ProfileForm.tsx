'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { uploadFiles } from "@/service/auth/actions";
import { ERROR } from "@/constants/enums/ERROR";

interface DropzoneProps{
    url:string;
    onUploadSuccess?:(file:File)=>void;
}
export interface UploadMessage{
    message:string;
}
const initialState:UploadMessage={
    message:"",
}
export default function ProfileForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [files,setFiles]=useState<File[]>([]);
    
    const {pending}=useFormStatus();
    const [state,formAction]=useFormState(uploadFiles,initialState);
    const onDrop = useCallback((acceptedFiles: File[]) => {
         setFiles(acceptedFiles.slice(0,1));  
    }, [files.slice(0,1)]);

    const { getRootProps, getInputProps, isDragActive,acceptedFiles,fileRejections } = useDropzone({
        onDrop,
        accept: {
            'image/jpg': ['.jpg'],
            'image/png':['.png']
        },
        multiple: false,
        maxFiles:1,
    });

    const handleClose = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('profile');
        router.push(`${pathname}/${params.toString()}`);
    }

    useEffect(()=>{
        if(fileRejections.length>0){
            alert(fileRejections[0].errors);
        }
        else if(state.message==='SUCCESS'){
            handleClose();
        }else if(state.message===`${ERROR.SERVER_ERROR}`){
            alert(ERROR.SERVER_ERROR);
            router.refresh();
        }else if(state.message===`${ERROR.INVALID_INPUT}`){
            alert('파일을 선택해주세요.');
            router.refresh();
        }
    }
    ,[state.message,fileRejections.length]);

    return (
        <dialog
            className="flex justify-center items-centerz-50"
        >
            <div
                className="bg-white w-[500px] h-auto shadow-lg border-slate-200 border-2 p-3"
            >
                <div className="w-full flex justify-end">
                    <button
                        onClick={handleClose}
                        className=' flex justify-start hover:bg-blue-50 rounded-full p-2'
                    >
                        <CloseIcon className='' />
                    </button>
                </div>
                <form
                    className="mt-5"
                    action={formAction}
                >
                    <div
                        onMouseEnter={focus}
                        {...getRootProps()}
                        className='dropzone needsclick flex flex-col justify-center items-center p-5'
                    >
                        <Image
                            src={"/svgs/icons/profile-icon.svg"}
                            alt={"Profile"}
                            width={100}
                            height={100}
                        />

                        <div
                            className={`dz-message needsclick`}>
                            <input 
                            {...getInputProps()}
                            disabled={files.length>1}
                            className={`dropzone ${isDragActive ? 'active' : ''}`}
                            name='file'
                            />
                            {files.length >0 ? (
                                <div>
                                {files.map((file) => (
                                  <div 
                                  className="bg-blue-50 rounded-full p-3"
                                  key={file.name}>
                                    <p
                                    className="text-blue-500 font-medium"
                                    >{file.name}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                                <p>Drag & drop some files here, or click to select files</p>
                            )}
                        </div>

                    </div>
                    <p className="text-red-500">※ .jpg , .png 파일만 가능합니다.</p>
                    <p className="text-red-500">※ 파일 업로드는 1개 까지만 가능합니다.</p>
                    <button
                        disabled={pending}
                        className="w-full rounded-lg font-medium bg-white text-xl border-slate-200 border-2 shadow-lg hover:bg=slate-50 p-2 mt-5 mb-2"
                        type="submit">프로필 수정</button>
                </form>
            </div>

        </dialog>);
}