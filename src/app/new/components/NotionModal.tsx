"use client";

import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFile } from "src/app/Redux/features/UploadFile";
import { addNotionFile } from "src/app/Redux/features/UploadNotionFile";
import { RootState } from "src/app/Redux/store";
import { uploadNotionFile } from "src/app/services/apiServices";
import UploadedNotionCard from '../components/UploadedNotionCard';

interface Props {
  closeModals: () => void;
  blocData: any;
}

const NotionModal: React.FC<Props> = ({ closeModals, blocData }) => {
  const dispatch = useDispatch();
  const files = useSelector((store: RootState) => store.uploadNotionFile.files);
  const { loading, error } = useSelector(
    (store: RootState) => store.uploadFile
  );

  const [ind, setInd] = useState(1);
  const token = getCookie("jwt");

  useEffect(() => {
    if(files[ind-1]){
        console.log(files[ind-1].percentCompleted);
    }
    }, [files]);

  const selectFile = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    selectFile.current?.click();
  };
  const handleChange = async (e: any) => {
    const fileUpload = {
        id: ind,
      file: e.target.files[0],
      name: e.target.files[0].name,
      size: e.target.files[0].size,
      percentCompleted: 0,
    };

    dispatch(addNotionFile(fileUpload));
    setInd(ind+1);

    const blocId = blocData.blocId;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    dispatch(uploadNotionFile(ind, fileUpload, formData, blocId, token));
  };

  return (
    <div className="w-[508px] max-h-[90vh] overflow-auto rounded-[10px] p-6 gap-5 flex flex-col items-center justify-start bg-[#181818]">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image src="/icons/notion.svg" alt="notion" width={40} height={40} />
          <div className="flex flex-col items-start justify-center">
            <div className="text-[#D0D0D0] font-inter text-sm font-medium">Notion</div>
            <div className="text-[#888] font-inter text-sm">notion.so</div>
          </div>
        </div>
        <Image
          onClick={closeModals}
          src="/icons/cross.svg"
          alt="close"
          width={24}
          height={24}
        />
      </div>
      <div className="w-full rounded-[10px]">
        <Image
          src="/video/notionDemo.gif"
          alt="notion demo"
          width={460}
          height={270}
          className="rounded-[10px]"
        />
      </div>
      <div className="w-full flex-col items-center justify-center">
        <div
          className=" w-full text-center rounded-[12px]  border-[1px] border-borderColor hover:border-white hover:border-dashed hover:cursor-pointer flex flex-col items-center py-4 px-6 space-y-2"
          onClick={handleClick}
        >
          <Image
            src={"/dashboard/upload.svg"}
            width={40}
            height={40}
            alt="upload"
          />
          <div className="font-spacegrotesk text-base text-[#FFFFFFCC]"><span className="text-[#28A1FF]">Click to upload</span> or drag or drop</div>
          <div className="font-spacegrotesk text-base text-[#FFFFFFCC]">Zip File</div>
          <input
            type="file"
            ref={selectFile}
            onChange={handleChange}
            accept=".zip, .csv, .md"
            hidden
          />
        </div>
        <div className="w-full flex flex-col items-center justify-start gap-2 mt-5">
        {files?.map((item: any, index: any) => (
            <div key={index} className="">
              <UploadedNotionCard
              ind={index+1}
                fileName={item.name}
                fileSize={Math.round((item.size / (1024 * 1024)) * 100) / 100}
                percentCompleted={item.percentCompleted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotionModal;
