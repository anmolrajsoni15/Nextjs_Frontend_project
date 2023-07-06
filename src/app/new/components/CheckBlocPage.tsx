import React from "react";
import DataSources from "./DataSources";
import BotContainer from "./BotContainer";

interface Props {
  website: Array<any>;
  file: Array<any>;
  other: Array<any>;
}

const CheckBlocPage: React.FC<Props> = ({ website, file, other }) => {

  return (
    <div className="w-4/5 flex items-start justify-center gap-10">
      <div className="w-1/2">
        <DataSources website={website} file={file} other={other} />
      </div>
      <div className="w-1/2">
        <BotContainer />       
      </div>
    </div>
  );
};

export default CheckBlocPage;