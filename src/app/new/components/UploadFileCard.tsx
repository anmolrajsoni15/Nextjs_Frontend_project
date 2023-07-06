'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRef } from 'react'
import { addFile } from '../../Redux/features/UploadFile'
import { useDispatch } from 'react-redux'
import { getCookie } from 'cookies-next'
import { uploadFile } from '../../services/apiServices'
import { setPercentCompleted } from '../../Redux/features/UploadFile'

const UploadFileCard = () => {

    const dispatch = useDispatch()
    const selectFile = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleClick = () => {
        selectFile.current?.click()
    }
    const handleChange = async (e: any) => {
        const fileUpload = {
            file: e.target.files[0],
            name: e.target.files[0].name,
            size: e.target.files[0].size,
            percentCompleted: 0,
        };

        const blocId = getCookie('blocId')
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        // dispatch(addFile(fileUpload));

        if (typeof blocId === 'string') {
            const token = getCookie('jwt')
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "BLOC-ID": blocId,
                },
                onUploadProgress: (ProgressEvent: any) => {
                    const percentCompleted = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);

                    dispatch(setPercentCompleted({ name: fileUpload.name, percentCompleted: 50 }));
                }
            }

            dispatch(uploadFile(fileUpload, formData, config));
        }
    }

    return (
        <>
        <div
            className=' w-[512px] text-center rounded-[12px]  border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col items-center py-4 space-y-2'
            onClick={handleClick}
        >
            <Image src={'/dashboard/upload.svg'} width={40} height={40} alt='upload' />
            <div>Click to upload or drag or drop</div>
            <div>PDF, .txt, word etc</div>
            <input type='file' ref={selectFile} onChange={handleChange} accept='.pdf,.ppt,.docx,.txt,.md' hidden />

        </div>
        </>
    )
}

export default UploadFileCard