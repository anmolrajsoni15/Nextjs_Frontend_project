'use client'

import React, { useRef, useState } from 'react';
import Input from './Input';
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

const How = ({ incrementCnt }) => {
  const options = [
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Customer Support',
      editable: false
    },
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Knowledge Base',
      editable: false
    },
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Sales support',
      editable: false
    },
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Terms & conditions',
      editable: false
    },
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Employee policies',
      editable: false
    },
    {
      icon: <WhatshotOutlinedIcon />,
      value: 'Something else',
      editable: true
    },
  ];

  const lastOptionRef = useRef(null);
  const [howData, setHowData] = useState("Something else");

  const handleClicks = (value) => {
    console.log(value);
    incrementCnt();
  };

  const handleKeyPress = (event, value) => {
    if (event.key === 'Enter' && value && value.editable) {
      handleClicks(value.value);
    }
  };

  const handleLastOptionKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClicks(event.target.value);
    }
  };

  const handleChange = (value) => {
    setHowData(value);
  }

  return (
    <>
      <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-10 md:py-12 lg:p-20 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f]">
        <div className="w-full font-spacegrotesk text-3xl leading-9 font-medium tracking-[-0.03em]">
          How will you use bloc?
        </div>
        <div className="w-full grid gap-x-2 grid-cols-1 md:grid-cols-2 cursor-pointer">
          {options.map((option, index) => (
            <div key={index} onClick={() => { if (!option.editable) handleClicks(option.value) }}>
              <Input
                icon={option.icon}
                value={option.value}
                editable={option.editable}
                onChange={handleChange}
                onKeyPress={(event) => {
                  if (index === options.length - 1) {
                    handleLastOptionKeyPress(event);
                  } else {
                    handleKeyPress(event, { value: option.value, editable: option.editable });
                  }
                }}
                ref={index === options.length - 1 ? lastOptionRef : null}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className='cursor-pointer font-spacegrotesk text-sm leading-5 font-medium text-[#94D0FF]' onClick={() => handleClicks(undefined)}>Skip for later</div>
    </>
  );
};

export default How;
