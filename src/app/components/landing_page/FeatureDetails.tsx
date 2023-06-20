import React from "react";
import Image from "next/image";

interface Props {
  icon: string;
  title: React.ReactNode;
  desc: React.ReactNode;
}

const FeatureDetails: React.FC<Props> = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col items-start justify-center p-4 py-2 gap-5">
      <div className="h-2/6 flex items-center justify-center">
        <div className="w-12 h-12 border-color flex items-center justify-center">
          <Image src={icon} alt="icon" width={24} height={24} />
        </div>
      </div>
      <div className="h-4/6 flex flex-col items-start justify-center gap-4">
        <div>
          <h3 className="font-roboto font-semibold text-lg leading-6">
            {title}
          </h3>
        </div>
        <div>
          <p className="text-[#888888] text-base leading-[26px] font-normal">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetails;
