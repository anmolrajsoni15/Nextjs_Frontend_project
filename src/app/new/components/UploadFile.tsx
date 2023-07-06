"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import UploadFileCard from "./UploadFileCard";
import UploadedFileCard from "./UploadedFileCard";

const UploadFile = () => {
  const files = useSelector((store: RootState) => store.uploadFile.files);
  const { loading, error } = useSelector(
    (store: RootState) => store.uploadFile
  );
  return (
    <div className="space-y-2">
      <UploadFileCard />
      {loading ? (
        <>
        <div className="my-2 font-bold font-spacegrotesk mx-2 animate-pulse"> Please Hold on your file is being uploaded... </div>
        <div className="space-y-2">
          {files?.map((item: any, index: any) => (
            <div key={index} className="">
              <UploadedFileCard
                fileName={item.name}
                fileSize={Math.round((item.size / (1024 * 1024)) * 100) / 100}
                percentCompleted={item.percentCompleted}
                integrationId={item.integrationId}
                key={index}
              />
            </div>
          ))}
        </div>
        </>
      ) : (
        <div className="space-y-2">
          {files?.map((item: any, index: any) => (
            <div key={index} className="">
              <UploadedFileCard
                fileName={item.name}
                fileSize={Math.round((item.size / (1024 * 1024)) * 100) / 100}
                percentCompleted={item.percentCompleted}
                integrationId={item.integrationId}
                key={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
