'use client';

import React from "react";
import Image from "next/image";
import HomeImg from "../../../../public/images/home.png";
import Button from "./Button";
import RotImg from "../RotatingImg/RotImg";
import Link from "next/link";

function Hero() {
  return (
    <>
      <div className="h-[150%] mb-14 lg:mb-0 md:h-fit md:mb-12 lg:h-full w-full flex items-center justify-center relative translate-y-8 lg:-translate-y-[15%]">
        <div className="container w-11/12 h-full gap-0 md:gap-6 lg:gap-0 md:w-full lg:w-11/12 md:h-4/5 relative top-[35%] md:top-[10%] lg:top-16 flex flex-col md:flex-row justify-center items-center">
          <div className="left flex flex-col w-full items-center md:items-start md:w-1/2 p-10 md:p-12 md:px-7 lg:p-16 px-5 lg:px-10">
            <div className="text-[33px] text-center font-bold font-poppins leading-tight md:text-left md:text-[2.5rem] md:leading-[50px] lg:leading-[70px] lg:text-5xl lg:max-w-[592px]">
              Everything your team needs to know{" "}
              <span className="text-[#36C5F0]">Just a question</span> away.
            </div>
            <div className="flex items-center w-full md:w-[110%] lg:w-[85%] lg:max-w-[480px] my-6">
              <p className="text-sm text-center md:text-xl md:text-left leading-[30px] font-space-grotesk">
                An AI tool that allows you to extract data from your multitude
                of resources through simple questions, so that you can focus on
                what&apos;s really important - your work.
              </p>
            </div>
            <div>
              <Link href={'https://nsbxei0ai38.typeform.com/to/fd3UK76K'}>
              <Button>Join the Waitlist</Button>
              </Link>
            </div>
          </div>
          <div className="right w-full md:w-1/2 flex items-center justify-center md:justify-center md:items-center lg:items-center lg:justify-start">
            <div className="hidden lg:block w-full h-full">
              <RotImg />
            </div>
            <Image
              src={HomeImg}
              alt="home"
              className="relative block lg:hidden md:top-0 lg:top-[5%] lg:left-[8%] w-full max-w-[80%] lg:max-w-[90%] xl:max-w-[80%] rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
