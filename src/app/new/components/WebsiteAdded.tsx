'use client'

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

interface Props {
    inputVal: string;
}

const WebsiteAdded: React.FC<Props> = ({inputVal}) => {
  const dispatch = useDispatch();
  return (
    <>
    <div className="flex items-center justify-center gap-5 w-3/4 h-12 my-2 ">
      <div className="flex items-center justify-start w-[85%] h-full border border-solid border-[#ffffff2d] rounded-md">
        <div className="w-[15%] border-r border-solid border-[#ffffff2d] h-full flex items-center justify-center text-[#FFFFFFCC] font-spacegrotesk text-lg">
          https://
        </div>
        <div className="w-[85%]">
          <input
            type="text"
            value={inputVal}
            readOnly
            className="bg-transparent border-none outline-none w-full text-[#FFFFFFCC] font-spacegrotesk text-lg placeholder:text-[#FFFFFF7d] font-medium px-5"
          />
        </div>
      </div>
      <div className="flex items-center justify-start w-[15%] h-full rounded-md">
        <button  className=" border-none outline-none text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium flex items-center justify-start rounded-md h-full w-fit">
          <Image
            src="/icons/delete.svg"
            width={16}
            height={16}
            alt="block"
            className="mx-3"
          />
        </button>
      </div>
    </div>
    </>
  );
};

export default WebsiteAdded;
