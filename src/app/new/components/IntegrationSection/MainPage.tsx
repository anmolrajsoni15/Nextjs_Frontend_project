"use client";

import React from "react";
import ToggleType from "./ToggleType";
import FileUpload from "./FileUpload/FileUpload";
import WebsiteCont from "./Website/WebsiteCont";
import { useRouter } from "next/navigation";
import { showNotification } from "src/app/Notifications/NotificationManager";

interface Props {
  blocDetails: any;
}

const MainPage: React.FC<Props> = ({ blocDetails }) => {
  const router = useRouter();
  const [type, setType] = React.useState<string>("file");
  const [isModified, setIsModified] = React.useState(false);

  const toggleSetting = (value: string) => {
    setType(value);
  };

  const handleClick = () => {
    if (isModified) {
      console.log("modified");
      router.push(`/new/bloc/${blocDetails.blocId}`);
    } else {
      console.log("not modified");
      showNotification("error", "Please add a data source before proceeding to the next step.");
    }
  };


  return (
    <div className="w-full flex flex-col items-center justify-center gap-14">
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
        create new bloc
      </button>
    </div>
  );
};

export default MainPage;
