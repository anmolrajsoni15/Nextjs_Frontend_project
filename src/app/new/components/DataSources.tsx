"use client";

import React, { useState } from "react";
import DataSourceCard from "./DataSourceCard";

interface Props {
  website: Array<any>;
  file: Array<any>;
  other: Array<any>;
}

const DataSources: React.FC<Props> = ({ website, file, other }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[20px]">
      <div className="font-spacegrotesk font-bold text-lg mb-2 text-whitey ">
        Added Data Sources
      </div>
      <div className="relative border border-solid border-[#FFFFFF1A] bg-compColor gap-5 shadow-md rounded-lg p-6 px-8 w-full flex flex-col">
        <div className="">
          {website && website.length > 0 && (
            <div className="flex flex-col w-full gap-3">
              <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                web sources
              </div>

              <div className="flex w-full items-center justify-start gap-[14px] flex-wrap">
                {website.map((item) => (
                  <DataSourceCard
                    key={item.integrationId}
                    icon="/icons/link.svg"
                    title={item.name}
                    id={item.integrationId}
                    progress={item.progress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          {file && file.length > 0 && (
            <div className="flex flex-col w-full gap-3">
              <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                files
              </div>

              <div className="flex w-full items-center justify-start gap-[14px] flex-wrap">
                {file.map((item) => (
                  <DataSourceCard
                    key={item.integrationId}
                    icon="/icons/file.svg"
                    title={item.name}
                    id={item.integrationId}
                    progress={item.progress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="">
          {other && other.length > 0 && (
            <div className="flex flex-col w-full gap-3">
              <div className="text-[#ffffffcc] text-[13px] leading-4 font-medium font-spacegrotesk">
                integrations
              </div>

              <div className="flex w-full items-center justify-start gap-[14px] flex-wrap">
                {other.map((item) => (
                  <DataSourceCard
                    key={item.integrationId}
                    icon={
                      item.type === "notion"
                        ? "/icons/notion.svg"
                        : "/icons/link.svg"
                    }
                    title={item.name}
                    id={item.integrationId}
                    progress={item.progress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSources;
