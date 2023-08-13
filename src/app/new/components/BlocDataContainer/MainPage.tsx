import Image from "next/image";
import React from "react";
import ToggleSettings from "./ToggleSettings";
import DataSourcePage from "./DataSourcePage";
import InterfaceContainer from "./Interface/InterfaceContainer";
import GeneralContainer from "./General/GeneralContainer";

interface Props {
  blocDetails: any;
}

const MainPage: React.FC<Props> = ({ blocDetails }) => {
  const [state, setState] = React.useState<string>("datasources");
  const [isModified, setIsModified] = React.useState(false);


  const toggleSetting = (value: string) => {
    setState(value);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center gap-8 ">
      <div className="flex items-center justify-center gap-[11px] ">
        <Image src="/icons/adjustments.svg" width={30} height={30} alt="plus" />
        <div className="font-poppins text-2xl font-semibold">Settings</div>
      </div>
      <ToggleSettings state={state} toggleSetting={toggleSetting} isModified={isModified} setIsModified={setIsModified} />
      <div className="w-full">
        {state === "datasources" ? (
          <DataSourcePage blocId={blocDetails.blocId} />
        ) : state === "interface" ? (
          <InterfaceContainer blocDetails={blocDetails} isModified={isModified} setIsModified={setIsModified} />
        ) : (
          <GeneralContainer blocDetails={blocDetails} isModified={isModified} setIsModified={setIsModified} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
