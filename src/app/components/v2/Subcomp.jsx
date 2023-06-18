"use client";

import React from "react";
import Image from "next/image";

function Subcomp({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-4 py-2">
      <div className="h-2/6 flex items-center justify-center">
        <div className="w-12 h-12 border-color flex items-center justify-center">
          <Image src={icon} alt="icon" width={24} height={24} />
        </div>
      </div>
      <div className="h-4/6 flex flex-col items-center justify-center gap-[14px]">
        <div>
          <h3 className="font-inter font-bold text-xl leading-6 text-center">{title}</h3>
        </div>
        <div>
          <p className="text-[#7d7d7d] text-base leading-[26px] font-normal text-center">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Subcomp;
