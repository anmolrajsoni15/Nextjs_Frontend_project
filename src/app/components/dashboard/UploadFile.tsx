'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import UploadFileCard from './UploadFileCard';
import UploadedFileCard from './UploadedFileCard';

const UploadFile = () => {
    const files = useSelector((store: RootState) => store.uploadFile.files);

    return (
        <div className="space-y-2">
            <UploadFileCard />
            <div className="space-y-2">
                {files?.map((item: any, index: any) => (
                    <UploadedFileCard
                        fileName={item.name}
                        fileSize={Math.round(item.file.size / (1024 * 1024)*100)/100}
                        percentCompleted={item.percentCompleted}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default UploadFile;
