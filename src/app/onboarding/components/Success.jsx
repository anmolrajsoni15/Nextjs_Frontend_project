"use client";

import React from "react";
import Image from "next/image";
import Icon from "../images/Icon.png";
import Button from "./Button";
import EastIcon from "@mui/icons-material/East";

const Success = ({ incrementCnt }) => {
  const handleClick = () => {
    incrementCnt();
  };

  return (
    <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-10 md:py-12 lg:p-20 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f] items-center text-white">
    <Image src={Icon} alt="success_icon" width={73} height={73} />
      <div className="flex flex-col w-full text-center mb-4">
        <div className="w-full font-spacegrotesk text-3xl leading-9 font-medium tracking-[-0.03em] text-white">
          congratulations, you&apos;re set up!
        </div>
        <div className="font-spacegrotesk font-medium text-sm leading-5">
          time to create your bloc
        </div>
      </div>
      <div>
        <div className="w-full my-3" onClick={handleClick}>
        <div className='/dashboard'> <Button value="Create new bloc" /></div>
        </div>
        <div className="font-spacegrotesk font-medium text-sm leading-5 text-white cursor-pointer">
          let me look around first
          <span className="px-1">
            <EastIcon style={{fontSize: "small"}} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Success;
