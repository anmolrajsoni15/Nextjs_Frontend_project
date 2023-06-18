'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRef } from 'react'
import { addFile } from '../../Redux/features/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { setPercentCompleted } from '../../Redux/features/UploadFile'

const UploadFileCard = () => {

    const dispatch = useDispatch()
    const selectFile = useRef<HTMLInputElement>(null);
    // const [percent, setPercent] = useState(0)

    const handleClick = () => {
        selectFile.current?.click()
    }
    const handleChange = async (e: any) => {
        const fileUpload = {
            file: e.target.files[0],
            name: e.target.files[0].name,
            percentCompleted: 0,
        };

        const blocId = getCookie('blocId')
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        dispatch(addFile(fileUpload));

        if (typeof blocId === 'string') {
            const token = getCookie('jwt')
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "BLOC-ID": blocId
                },
                onUploadProgress: (ProgressEvent: any) => {
                    const percentCompleted = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);

                    dispatch(setPercentCompleted({ name: fileUpload.name, percentCompleted }));
                }
            }

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/upload-file`, formData, config);
                if (res.status !== 200) {
                    throw new Error('Network Response was not ok!');
                }
                const result = await res.data;
                console.log(result);
            }
            catch (error) {
                console.error("There has been a problem within your fetch operations:", error)
            }
        }
    }

    return (
        <div
            className=' w-[512px] text-center rounded-[12px]  border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col items-center py-4 space-y-2'
            onClick={handleClick}
        >
            <Image src={'/dashboard/upload.svg'} width={40} height={40} alt='upload' />
            <div>Click to upload or drag or drop</div>
            <div>PDF, .txt, word etc</div>
            <input type='file' ref={selectFile} onChange={handleChange} hidden />

        </div>
    )
}

export default UploadFileCard