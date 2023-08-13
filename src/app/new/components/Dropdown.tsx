"use client"

import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

const options = [
  "On your own website as a section",
  "On your own website as a Chatbot",
  "On Askbloc hosted solution",
];

interface DropdownProps {
  icon: string;
  setValue: (option: string) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({ icon, setValue, value }) => {
//   const user = userData;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('where will you host the bloc?');
  const [rotateDegree, setRotateDegree] = useState(0);

  useEffect(() => {
    // var val;
    // if (user.designation === "none") val = "Choose Designation";
    // else val = user.designation;
    setSelectedOption(value);
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setValue(option);
    setIsOpen(false);
    setRotateDegree(0);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  return (
    <div className="relative w-full h-12 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929]">
      <div className="icons w-[15%] text-[#f3f3f3cc] flex items-center justify-center">
        <Image src={icon} alt="icon" width={19} height={19} />
      </div>
      <div onClick={toggleDropdown} className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
        {selectedOption}
      </div>
      <button className="bg-transparent w-[10%]" onClick={toggleDropdown}>
        <FiChevronDown
          style={{
            transform: `rotate(${rotateDegree}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 mt-2 w-full flex flex-row flex-wrap">
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer hover:bg-[#5e5e5e] border border-solid border-zinc-500 rounded-3xl"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
          <li 
            className="p-2 hover:bg-gray-200 cursor-pointer hover:bg-[#5e5e5e] border border-solid border-zinc-500 rounded-3xl"
          >
            On Whatsapp (Coming Soon)
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
