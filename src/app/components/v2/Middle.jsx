"use client";

import React from "react";
import Image from "next/image";
import MiddleImg from "../../../../public/images/middle.svg";
import GradientWrapper from "../GradientWrapper";

function Middle() {
  return (
    <>
      <div className="h-[700] md:h-[900px] lg:h-[1010px] flex flex-col w-full relative items-center justify-center">
        <div className="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
          <p className="text-2xl md:leading-normal lg:leading-loose text-center md:text-[34px] font-semibold">
            Don&apos;t look for answers, just ask!
          </p>
          <p className="text-center font-normal text-lg md:leading-8 md:font-medium md:text-xl my-5">
            Revolutionize Your Team&apos;s Productivity with Q/A. No more Repeat
            Explanations! The questions you set up can range from simple yes or
            no questions all the way to advanced mathematical formulas, and you
            can create as many as needed.
          </p>
        </div>
        <div className="my-14 w-3/4 lg:w-fit">
          <GradientWrapper wrapperClassName="max-w-2xl md:max-w-lg lg:max-w-2xl h-[50%] top-[25%] inset-x-0" className="h-fit">
          <Image
            src={MiddleImg}
            alt="middle"
            className=""
          />
          </GradientWrapper>
        </div>
      </div>
      {/* <Globe /> */}
    </>
  );
}

export default Middle;
