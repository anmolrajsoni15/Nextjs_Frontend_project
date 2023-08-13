'use client'

import { getCookie } from 'cookies-next'
import Image from 'next/image'
import React, {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../Redux/store'
import { uploadFile2 } from '../../../../services/apiServices'
import { addFile2 } from '../../../../Redux/features/FileUpload'

interface Props {
    ind: number;
    setInd: any;
    progress: boolean;
    setProgress: any;
    isModified: boolean;
    setIsModified: any;
}

const FileUploadContainer:React.FC<Props> = ({
    ind,
    setInd,
    progress,
    setProgress,
    isModified,
    setIsModified
}) => {

    const dispatch = useDispatch()
    const selectFile = useRef<HTMLInputElement>(null);

    const {blocData} = useSelector((state: RootState) =>state.newBlocState);

    const handleClick = () => {
        selectFile.current?.click()
    }

    const handleChange = async (e: any) => {
        const fileUpload = {
            id: ind,
            file: e.target.files[0],
            name: e.target.files[0].name,
            size: Math.round((e.target.files[0].size / (1024 * 1024)) * 100) / 100,
            percentCompleted: 0,
        };
        
        dispatch(addFile2(fileUpload));
        
        await setInd(ind+1);
        const blocId = getCookie('blocId');
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        // dispatch(addFile(fileUpload));

        if (typeof blocId === 'string') {
            const token = getCookie('jwt')
            setProgress(true);
            dispatch(uploadFile2(ind, formData, blocId, token));
            await setIsModified(true);
        }
    }

  return (
    <div
            className=' w-full text-center rounded-[12px]  border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex flex-col items-center py-4 space-y-2'
            onClick={handleClick}
        >
            <Image src={'/dashboard/upload.svg'} width={40} height={40} alt='upload' />
            <div>Click to upload or drag or drop</div>
            <div>PDF, .txt, word etc</div>
            <input type='file' ref={selectFile} onChange={handleChange} accept='.pdf,.ppt,.docx,.txt,.md' hidden />

        </div>
  )
}

export default FileUploadContainer