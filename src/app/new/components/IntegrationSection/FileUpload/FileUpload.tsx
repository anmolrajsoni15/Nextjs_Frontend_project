"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { clearMessage2 } from "../../../../Redux/features/FileUpload";
import FileUploadContainer from "./FileUploadContainer";
import FileCard from "./FileCard";
import FileLoadingModal from "./FileLoadingModal";
import Modal from "react-modal";
import Image from "next/image";
import LayoutEffect from "src/app/components/LayoutEffect";

interface Props{
  isModified: boolean;
  setIsModified: any;
}

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    border: "1.75px solid rgba(0, 0, 0, 0.83)",
    borderRadius: "18px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const FileUpload:React.FC<Props> = ({
  isModified,
  setIsModified
}) => {
  const dispatch = useDispatch();

  const { loading, files, message } = useSelector(
    (state: RootState) => state.uploadFile2
  );
  const [progress, setProgress] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [ind, setInd] = React.useState(0);

  const toggleShowNext = () => {
    setShowNext(true);
  };

  React.useEffect(() => {
    if (message === "success") {
      setProgress(false);
      setShowNext(false);
      setTimeout(() => {
        dispatch(clearMessage2());
      }, 2000);
    }
  }, [message, setProgress, dispatch]);

  return (
    <LayoutEffect
        className="duration-300 delay-50"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
    <div className="w-full bg-modalBg border border-solid border-[#2F2F2F] px-20 py-10 rounded-3xl">
      {files.length === 0 ? (
        <FileUploadContainer
          ind={ind}
          setInd={setInd}
          progress={progress}
          setProgress={setProgress}
          isModified={isModified}
          setIsModified={setIsModified}
        />
      ) : files.length > 0 && progress === false ? (
        <div className="flex w-full items-start justify-center flex-col">
          <div className="w-full flex flex-col gap-[14px] items-center justify-center">
            {files.map((file, index) => (
              <FileCard
                key={index}
                fileName={file.name}
                fileSize={file.size}
                integrationId={file.id}
              />
            ))}
          </div>
          <div
            onClick={toggleShowNext}
            className={`${
              showNext ? "hidden" : "flex"
            } mt-5 font-spacegrotesk text-[19px] text-[#FFFFFFBF] font-medium underline cursor-pointer items-center justify-center gap-2 `}
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <div className="">Add More files</div>
          </div>
          {showNext && (
            <div className="w-full items-center justify-center mt-6">
              <FileUploadContainer
                  ind={ind}
                  setInd={setInd}
                  progress={progress}
                  setProgress={setProgress} isModified={isModified} setIsModified={setIsModified}              
              />
            </div>
          )}
        </div>
      ) : null}
      <Modal
        isOpen={progress}
        //   onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Bloc Name"
        ariaHideApp={false}
        onAfterOpen={() => {
          customStyles.content.opacity = 1;
          customStyles.content.zIndex = 1000;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <FileLoadingModal
          percentage={files.length > 0 ? files[ind + 1]?.percentCompleted : 0}
        />
      </Modal>
    </div>
    </LayoutEffect>
  );
};

export default FileUpload;
