"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
  ispublic: boolean;
  setIspublic: any;
  openaimodel: string;
  setOpenaimodel: any;
  baseprompt: string;
  setBaseprompt: any;
  setIsModified: any;
}

const options = [
  {
    name: "GPT-3.5 Turbo",
    value: "gpt3.5-turbo",
  },
  {
    name: "GPT-4",
    value: "gpt4",
  },
];

const state = [
  {
    name: "Public",
    value: true,
  },
  {
    name: "Private",
    value: false,
  },
];

const TechnicalCont: React.FC<Props> = ({
  ispublic,
  setIspublic,
  openaimodel,
  setOpenaimodel,
  baseprompt,
  setBaseprompt,
  setIsModified,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Open Ai Model");
  const [rotateDegree, setRotateDegree] = useState(0);
  const [rotateDegree2, setRotateDegree2] = useState(0);

  const handleInputChange = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      inputRef.current.style.maxHeight = "100px";
      inputRef.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef.current.style.overflowY =
        inputRef.current.scrollHeight > 300 ? "scroll" : "hidden";
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setRotateDegree2(isOpen2 ? 0 : 180);
  };

  const handleOptionClick = (value: string, names: string) => {
    setSelectedOption(names);
    setOpenaimodel(value);
    setIsOpen(false);
    setRotateDegree(0);
    setIsModified(true);
  };

  const handleStateClick = (value: boolean, names: string) => {
    setIspublic(value);
    setIsOpen2(false);
    setRotateDegree2(0);
    setIsModified(true);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="font-spacegrotesk text-whitey text-lg font-bold">
        Technical Settings
      </div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-6 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col w-full items-start justify-center gap-2">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              State
            </div>
          </div>
          <div
            className="w-3/5 flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
              rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base"
          >
            <div className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
              {ispublic ? "Public" : "Private"}
            </div>
            <button
              className="bg-transparent w-[10%]"
              onClick={toggleDropdown2}
            >
              <FiChevronDown
                style={{
                  transform: `rotate(${rotateDegree2}deg)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
          {isOpen2 && (
            <ul className=" relative mt-2 top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 w-3/5 flex flex-col">
              {state.map((item) => (
                <li
                  key={item.name}
                  value={item.name}
                  className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                  onClick={() => handleStateClick(item.value, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col w-full items-start justify-center gap-2">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Model
            </div>
          </div>
          <div
            className="w-3/5 flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
              rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base"
          >
            <div className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
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
          </div>
          {isOpen && (
            <ul className=" relative mt-2 top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 w-3/5 flex flex-col">
              {options.map((option) => (
                <li
                  key={option.name}
                  value={option.name}
                  className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                  onClick={() => handleOptionClick(option.value, option.name)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <div className="flex items-center justify-between w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              base prompt
            </div>
            <button
              onClick={() => setBaseprompt("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <textarea
            ref={inputRef}
            value={baseprompt}
            onChange={(e) => {
              setBaseprompt(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FF878780] h-auto min-h-[48px] rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
            rows={2}
            style={{ resize: "none", minHeight: "48px", height: "auto" }}
            onInput={handleInputChange}
          />
          <div className="flex items-start justify-start gap-3 mt-2">
            <Image
              src="/icons/warning-sign.svg"
              width={24}
              height={24}
              alt="warning"
            />
            <div className="text-[#FFFFFF66] font-spacegrotesk font-normal text-xs">
              Changing the base prompt can significantly impact the chatbot’s
              accuracy and behavior. Proceed with caution and review the changes
              carefully. Unexpected or misleading responses may occur.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalCont;
