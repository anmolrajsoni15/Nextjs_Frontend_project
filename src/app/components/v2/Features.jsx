"use client";

import React from "react";
import Image from "next/image";
import image1 from "../../../../public/images/image1.png";
import image2 from "../../../../public/images/image2.png";
import Bottom from "./Bottom";
import Qualities from "./Qualities";
import Link from "next/link";
import GradientWrapper from "../GradientWrapper";
import Button from "./Button";

function Features() {
  return (
    <div className="flex flex-col h-full gap-[75px] items-center mb-28">
      <div className="flex flex-col w-11/12 text-center md:w-4/5 items-center justify-center gap-7 px-8">
        <p className="text-2xl text-center leading-7 md:text-[32px] md:leading-10 lg:leading-[44px] font-poppins font-semibold">
          Don&apos;t look across 10s of Documents, just ask.
        </p>
        <p className="font-spacegrotesk font-medium text-lg md:text-xl md:leading-7">
          Revolutionize Your Team&apos;s Productivity with Q/A. No more Repeat
          Explanations!
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-5/6 items-center gap-6 md:h-[415px]">
        <div className="border-color2 flex w-[95%] md:w-1/2 rounded-3xl items-center h-full">
          <div className="bg-black rounded-3xl p-6 gap-8 flex flex-col w-full h-full items-center">
            <div className="h-3/5 flex items-center justify-center">
              <Image src={image1} alt="icon1" />
            </div>
            <div className="h-2/5 flex flex-col gap-4 items-start justify-center">
              <h3 className="text-lg font-semibold">
                Top Integrations available
              </h3>
              <p className="text-base leading-7 text-[#7d7d7d]">
                Bloc can be integrated with a lot of apps, so you never miss
                anything. Notion, Google Drive, Figma and slack we have it all.
              </p>
            </div>
          </div>
        </div>
        <div className="border-color2 flex w-[95%] md:w-1/2 rounded-3xl items-center h-full">
          <div className="bg-black rounded-3xl p-6 gap-8 flex flex-col w-full h-full items-center">
            <div className="h-3/5 flex items-center justify-center">
              <Image src={image2} alt="icon1" />
            </div>
            <div className="h-2/5 flex flex-col gap-4 items-start justify-center">
              <h3 className="text-lg font-semibold">
                Centralise your knowledge base
              </h3>
              <p className="text-base leading-7 text-[#7d7d7d]">
                Elevate your knowledge management game by having a centralised
                platform for all your valuable data.
              </p>
            </div>
          </div>
        </div>
      </div>
      <GradientWrapper wrapperClassName="max-w-lg h-16 top-[35%] inset-x-0" className="h-fit">
      <div className="w-5/6 border-[1px] border-solid border-[#ffffff3a] rounded-2xl flex flex-col items-center justify-center h-[230px] font-spacegrotesk gap-6">
        <div className="text-center w-4/5 text-sm font-normal md:w-2/3 md:text-xl md:leading-6 md:font-medium">
          <p>
            I have to say, I was a bit skeptical about Bloc at first, but after
            using it for a few days, I&apos;m a believer. The ability to ask
            simple questions and get immediate answers from our company&apos;s
            knowledge base has been a game-changer.
          </p>
        </div>
        <div className="text-center w-4/5 text-base font-normal md:w-2/3 md:text-xl md:leading-6 md:font-medium">
          <p>Gluman desk</p>
          <p>Founder of Vernit</p>
        </div>
      </div>
      </GradientWrapper>
      <div className="flex flex-row items-center justify-center w-full h-36 border-y-[1px] border-solid border-y-[#ffffff3a]">
        <div className="w-5/6 h-full lg:gap-8 lg:w-5/6 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="text-xl text-center md:text-2xl font-poppins font-semibold">
            Join the Communication Revolution Between Teams with Bloc
          </div>
          <Link href={'https://nsbxei0ai38.typeform.com/to/fd3UK76K'}>
            <button className="w-40 h-12 md:w-52 md:h-14 lg:w-44 lg:h-14 bg-[#0784C6] hover:bg-[#2793cd] rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-base md:text-lg leading-6">
              Join the Waitlist
            </button>
          </Link>
        </div>
      </div>
      <GradientWrapper wrapperClassName="max-w-lg h-16 top-[40%] inset-x-0" className="mt-12 h-[1750px] md:h-[950px] lg:h-[650px]">
      <div className="flex flex-col items-center justify-center h-[1750px] md:h-[950px] gap-10 lg:gap-0 lg:h-[650px] w-full">
        <Qualities />
      </div>
      </GradientWrapper>
      <Bottom />
    </div>
  );
}

export default Features;
