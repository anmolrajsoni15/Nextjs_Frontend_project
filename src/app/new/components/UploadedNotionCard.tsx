"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearNotionFile } from "../../Redux/features/UploadNotionFile";

interface Props {
  ind: number;
  fileName: string;
  fileSize: any;
  percentCompleted: any;
}

const UploadedNotionCard: React.FC<Props> = ({
  ind,
  fileName,
  fileSize,
  percentCompleted,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`w-full rounded-[12px] border-[1px] border-solid 
    ${percentCompleted === 100 ? "border-[#09BC8F]" : "border-borderColor"} hover:border-dashed hover:cursor-pointer flex flex-col p-4 space-y-2`}>
      <div className="flex items-start justify-between gap-1">
        <div className="w-[10%]">
          <Image
            src="/dashboard/uploaded.svg"
            width={30}
            height={30}
            alt="file"
          />
        </div>
        <div className="w-[90%]">
          <div className="flex justify-between">
            <div className="">
              <div>{fileName}</div>
              <div>{fileSize} MB</div>
            </div>
            {percentCompleted === 100 ? (
              <div onClick={() => dispatch(clearNotionFile(ind))}>
                <Image src='/icons/delete.svg' alt="clear" width={20} height={20} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="w-96 h-2 bg-white rounded-full my-2 flex">
              <div
                style={{width: `${percentCompleted}%`}}
                className={`bg-[#09BC8F] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2`}
              ></div>
            </div>
            <div>{percentCompleted}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedNotionCard;
