'use client'

import React from 'react'
import Input from './Input';
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";


const Where = ({incrementCnt}) => {
    const options = [
        {
            icon: <WhatshotOutlinedIcon />,
            value: 'On our hosted website (askbloc.ai/bloc)'
        },
        {
            icon: <WhatshotOutlinedIcon />,
            value: 'On your own domain (self-hosted)'
        },
        {
            icon: <WhatshotOutlinedIcon />,
            value: 'A chatbot on your website'
        },
        {
            icon: <WhatshotOutlinedIcon />,
            value: 'A bot on your mobile app'
        },
        {
            icon: <WhatshotOutlinedIcon />,
            value: 'A slack or a discord bot'
        },
    ];

    const handleClicks = (value) => {
        console.log(value);
        incrementCnt();
    };
    

  return (
    <>
      <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-10 md:py-4 lg:p-20 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f]">
            <div className="w-full font-spacegrotesk text-2xl leading-9 font-medium tracking-[-0.03em] text-white">
            Where would you use bloc?
            </div>
            <div className="w-full grid grid-cols-1 cursor-pointer">
                {options.map((option, index) => (
                    <div key={index} onClick={() => handleClicks(option.value)}>
                    <Input icon={option.icon} value={option.value} />
                    </div>
                ))}
            </div>
        </div>
        <div className='cursor-pointer font-spacegrotesk text-sm leading-5 font-medium text-[#94D0FF]' onClick={() => handleClicks(undefined)}>Skip for later</div>
    </>
  )
}

export default Where