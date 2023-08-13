"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";

const BlocListSkeleton = () => {
  return (
    <table className="table-auto border-collapse border border-solid border-[#262626] rounded-2xl! w-[94%] mt-6">
      <thead className="bg-[#141414] border-b border-solid border-[#262626] rounded-t-2xl">
        <tr className="text-[#B0B0B0] font-inter font-medium text-xs">
          <th className="text-left p-4 pl-6">
            <Skeleton height={10} width={80} />
          </th>
          <th className="text-left p-4 pl-0">
            <Skeleton height={10} width={80} />
          </th>
          <th className="text-left p-4 pl-0">
            <Skeleton height={10} width={80} />
          </th>
          <th className="text-left p-4"></th>
        </tr>
      </thead>
      <tbody className="text-[#ffffff7d]">
        {Array.from(Array(3).keys()).map((i) => (
        <tr key={i} className="border-b border-[#ffffff1a] w-full">
          <td className="py-4 w-1/2">
            <div className="flex items-center justify-start gap-2 pl-6">
              <div className="">
                <Skeleton circle width={35} height={35} />
              </div>
              <Skeleton width={150} height={15} borderRadius={9999} />
            </div>
          </td>
          <td className="py-4 font-inter text-sm text-[#B0B0B0] w-1/5">
            <Skeleton width={100} height={15} borderRadius={9999} />
          </td>
          <td className="py-4 font-inter text-sm text-[#B0B0B0] w-1/5">
            <Skeleton width={100} height={15} borderRadius={9999} />
          </td>
          <td className="py-4 w-[15%]">
            <div className="flex items-center justify-start gap-3">
              <Skeleton
                circle
                width={20}
                height={20}
                containerClassName="flex-1"
              />
              <Skeleton
                circle
                width={20}
                height={20}
                containerClassName="flex-1"
              />
              <Skeleton
                circle
                width={20}
                height={20}
                containerClassName="flex-1"
              />
            </div>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlocListSkeleton;
