'use client'
import React from "react";

const InfoTooltip: React.FC<{ text: string; position: string }> = ({ text, position }) => {
    return (
      <div className={`${position} tooltip z-[1000] font-inter font-medium absolute bg-[#626262] text-[#FFFFFFCC] p-2 px-3 rounded text-xs w-[270px] shadow-md shadow-[#4545459e]`}>
        {text}
        <style jsx>
            {`
            .tooltip:before {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 10px 20px 0 0;
                border-color: #626262 transparent transparent transparent;
              }
            `}
        </style>
      </div>
    );
  };

export default InfoTooltip;
  