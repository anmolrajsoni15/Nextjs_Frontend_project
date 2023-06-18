"use client";

import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "BigOption 4",
  "Option 5",
  "BigOption 6",
  "Option 7",
]

const Dropdown = ({ icon, setValue, userData }) => {
  const user = userData;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(user.designation);
  const [rotateDegree, setRotateDegree] = useState(0);

  useEffect(() => {
    var val;
    if(user.designation === "none")
      val = "Choose Designation";
    else
      val = user.designation;
    setSelectedOption(val);
  }, [user.designation]);

  const handleOptionClick = (option) => {
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
    <div className="relative w-full h-14 md:h-[62px] my-2 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929]">
      <div className="icons w-[20%] text-[#f3f3f3cc] flex items-center justify-center">
        {icon}
      </div>
      <div className="w-[70%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
        {selectedOption}
      </div>
      <button className="bg-transparent w-[10%]" onClick={toggleDropdown}>
        <KeyboardArrowDownIcon
          style={{
            transform: `rotate(${rotateDegree}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[100%] left-[5%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 mt-2 w-3/4 flex flex-row flex-wrap">
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer hover:bg-[#5e5e5e] border border-solid border-zinc-500 rounded-3xl"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
