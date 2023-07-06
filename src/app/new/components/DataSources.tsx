'use client'

import Image from "next/image";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import DataSourceCard from "./DataSourceCard";

interface Props {
  website: Array<any>;
  file: Array<any>;
  other: Array<any>;
}

const DataSources: React.FC<Props> = ({ website, file, other }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rotateDegree, setRotateDegree] = useState(0);

  const handleOptionClick = () => {
    setIsOpen(false);
    setRotateDegree(0);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <div className="font-poppins font-semibold text-xl mb-2">
        Added Data Sources
      </div>
      <div className="relative w-full h-12 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929]">
        <div className="icons w-[15%] text-[#f3f3f3cc] flex items-center justify-center">
          <Image
            src="/icons/green-tick.svg"
            alt="icon"
            width={19}
            height={19}
          />
        </div>
        <div className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
          connected sources
        </div>
        <button className="bg-transparent w-[10%]" onClick={toggleDropdown}>
          <FiChevronDown
            style={{
              transform: `rotate(${rotateDegree}deg)`,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
      </div>
      {isOpen && (
        <div className="relative bg-[#292929] gap-2 shadow-md rounded-md p-2 px-5 w-full flex flex-col">
          <div className="">
            {website && website.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                  web sources
                </div>

                <div className="flex w-full items-center justify-start gap-3 flex-wrap">
                  {website.map((item) => (
                    <DataSourceCard
                      key={item.integrationId}
                      icon="/icons/link.svg"
                      title={item.name}
                      id={item.integrationId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            {file && file.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                  files
                </div>

                <div className="flex w-full items-center justify-start gap-3 flex-wrap">
                  {file.map((item) => (
                    <DataSourceCard
                      key={item.integrationId}
                      icon="/icons/file.svg"
                      title={item.name}
                      id={item.integrationId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="">
            {other && other.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                  integrations
                </div>

                <div className="flex w-full items-center justify-start gap-3 flex-wrap">
                  {other.map((item) => (
                    <DataSourceCard
                      key={item.integrationId}
                      icon="/icons/link.svg"
                      title={item.name}
                      id={item.integrationId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSources;
