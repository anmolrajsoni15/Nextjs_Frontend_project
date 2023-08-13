import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearFile2 } from "../../../../Redux/features/FileUpload";

const FileCard = ({ fileName, fileSize, integrationId }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full rounded-[12px] border-[1px] border-borderColor hover:border-white hover:cursor-pointer flex items-start justify-between p-4 space-y-2">
      <div className="flex space-x-2">
        <div>
          <Image
            src="/dashboard/uploaded.svg"
            width={30}
            height={30}
            alt="file"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <div className="">
              <div>{fileName}</div>
              <div>{fileSize} MB</div>
            </div>
          </div>
        </div>
      </div>
            <div onClick={() => dispatch(clearFile2(fileName))}>
              <Image
                src="/icons/delete.svg"
                width={20}
                height={20}
                alt="delete"
              />
            </div>
    </div>
  );
};

export default FileCard;
