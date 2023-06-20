'use client';

import React from 'react'
import Globe from './Globe';
import Button from './Button';

function Bottom() {
  return (
    <div className="w-full h-[500px] md:h-[761px] md:py-24 flex flex-col md:flex-col-reverse lg:flex-row items-center justify-center">
        <div className="w-full lg:w-[48%] xl:w-[55%]">
          <div className="w-full border-color1 border-x-0 h-[400px] md:h-72 lg:h-96 p-6 lg:pl-[90px] xl:pl-[124px] flex flex-col items-start justify-center gap-5">
            <h1 className="font-poppins text-2xl font-semibold">
              Empower Everyone.
            </h1>
            <p className="text-[#7d7d7d] font-roboto text-base">
              Join us today and work together with confidence, transparency, and
              accelerated success. Experience the power of Bloc and empower your
              team to effortlessly tackle data with AI-driven insights. And
              don&apos;t forget to check out the waitlist map showcasing the
              last 20 people who joined our community. Let&apos;s move towards
              success together!
            </p>
            <Button text={'Join the Waitlist'} />
          </div>
        </div>
        <div className="md:w-full lg:w-[52%] xl:w-[45%] mx-auto hidden md:block">
          <Globe />
        </div>
      </div>
  )
}

export default Bottom