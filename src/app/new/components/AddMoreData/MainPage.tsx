"use client";

import React from "react";
import ToggleType from "../IntegrationSection/ToggleType";
import FileUpload from "../IntegrationSection/FileUpload/FileUpload";
import WebsiteCont from "../IntegrationSection/Website/WebsiteCont";
import { useRouter } from "next/navigation";
import { showNotification } from "../../../Notifications/NotificationManager";

interface Props {
  blocId: string;
  closeModal: any;
}

const MainPage: React.FC<Props> = ({ blocId, closeModal}) => {
  const router = useRouter();
  const [type, setType] = React.useState<string>("file");
  const [isModified, setIsModified] = React.useState(false);

  const toggleSetting = (value: string) => {
    setType(value);
  };

  const handleClick = () => {
    if (isModified) {
      console.log("modified");
      showNotification("success", "Data Sources added successfully");
    } else {
      console.log("not modified");
    }
    closeModal();
  };


  return (
    <div className="w-[1000px] pt-10 h-fit max-h-[90vh] overflow-auto bg-modalBg flex flex-col items-center justify-start gap-14">
      <ToggleType
        type={type}
        setType={setType}
        isModified={isModified}
        setIsModified={setIsModified}
      />
      <div className={`${type === "file" ? "w-1/2" : "w-3/4"} mb-20`}>
        {type === "file" ? (
          <FileUpload isModified={isModified}
          setIsModified={setIsModified} />
        ) : type === "website" ? (
          <WebsiteCont isModified={isModified}
          setIsModified={setIsModified} />
        ) : null}
      </div>
      <button 
        onClick={handleClick}
        className={`bg-primary py-[14px] px-14 rounded-[5px] my-5 ${isModified === false ? "opacity-70" : "opacity-100"} `}
      >
        Add More Data
      </button>
    </div>
  );
};

export default MainPage;
