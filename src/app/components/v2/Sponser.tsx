import React from "react";
import HomeMarquee from "../landing_page/HomeMarquee";
import Image from "next/image";

const Sponser = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col items-center justify-center gap-12 py-24">
      <div className="w-11/12 md:w-full bg-[#181818] px-[29px] py-8 rounded-[20px] gap-8 flex flex-col items-center justify-center mx-auto">
        <div className="text-center text-[#EAECF0] text-base font-inter font-medium">
          Companies that work with us
        </div>
        <HomeMarquee />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="w-11/12 lg:w-1/2 rounded-[20px] bg-[#181818] flex flex-col gap-8 py-[29px] px-8 items-center justify-center">
          <div className="font-inter text-base font-medium text-[#EAECF0] text-center">
            We are backed by
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/companies/first-cheque.svg"
              alt="first-cheque"
              width={256}
              height={44}
            />
          </div>
        </div>
        <div className="w-11/12 hidden md:flex lg:w-1/2 rounded-[20px] bg-[#181818] flex-col gap-8 py-[29px] px-8 items-center justify-center">
          <div className="font-inter text-base font-medium text-[#EAECF0] text-center">
            Recognised by
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center justify-center w-full">
            <Image
              src="/companies/startupindia.svg"
              alt="StartupIndia"
              width={172}
              height={41}
            />
            <Image src="/companies/Group.svg" alt="microsoft founders hub" width={215} height={51} />
            <Image
              src="/companies/Pieds2.svg"
              alt="Pieds"
              width={150}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponser;
