import Image from "next/image";
import React from "react";
import LinearWithValueLabel from "./LinearProgressWithLabel";

interface Props {
  percentage: number;
}

const FileLoadingModal: React.FC<Props> = ({ percentage }) => {
  return (
    <div className="flex flex-col w-[35vw] p-6 gap-5 items-center justify-start bg-[#181818] text-white rounded-lg">
      <div className="text-center">
        Sit back and relax while we upload your Notion Zip files.
      </div>
      <div className="w-full items-end h-2 bg-white rounded-full my-2 flex flex-col justify-between gap-2">
        <div
          style={{ width: `${percentage}%` }}
          className={`bg-[#0784C6] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2`}
        ></div>
        <div className="">{`${percentage}%`}</div>
        <LinearWithValueLabel percentage={percentage} />
      </div>
      <div className="flex w-full items-center justify-center">
        <Image
          src="/icons/v3icons/loading.gif"
          width={228}
          height={140}
          alt="loading"
        />
        {""}
      </div>
    </div>
  );
};

export default FileLoadingModal;
