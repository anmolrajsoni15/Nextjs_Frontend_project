"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FiChevronDown } from "react-icons/fi";

const options = [
  {
    name: "Restricted",
    value: false,
  },
  {
    name: "Anyone with the Link",
    value: true,
  },
];

const AccessModal = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [people, setPeople] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Restricted");
  const [rotateDegree, setRotateDegree] = useState(0);
  const [rotateDegree2, setRotateDegree2] = useState(0);
  const [ispublic, setIspublic] = useState(false);
  const [mode, setMode] = useState("user");

  const handleOptionClick = (value: boolean, names: string) => {
    setSelectedOption(names);
    setIspublic(value);
    setIsOpen(false);
    setRotateDegree(0);
  };

  const handleStateClick = (value: boolean, names: string) => {
    setIspublic(value);
    setIsOpen2(false);
    setRotateDegree2(0);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setRotateDegree2(isOpen2 ? 0 : 180);
  };
  return (
    <div className="bg-[#181818] text-[#ffffffcc] w-[500px] p-10 flex flex-col items-center justify-start gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="font-spacegrotesk font-medium text-[28px] leading-normal">
          Bloc Access
        </div>
        <Image
          src="/icons/questionMark.svg"
          width={24}
          height={24}
          alt="tick"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <div className="w-3/4 h-14 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929]">
          <Image
            src="/icons/people.svg"
            width={18}
            height={17}
            alt="block"
            className="mx-3"
          />
          <input
            type="text"
            placeholder={"Add people to your group"}
            onChange={(e) => {
              setPeople(e.target.value);
            }}
            className="bg-transparent border-none outline-none w-full text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium"
          />
        </div>
        <button className="bg-[#0784C6] w-1/4 rounded py-4 font-spacegrotesk font-medium text-base">
          Invite
        </button>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div className="font-spacegrotesk font-medium text-xl text-[#FFFFFFB2]">
          People With Access
        </div>
        <div className="flex w-full items-center justify-start gap-4 py-2">
          <Image
            src={user && user.photo ? user.photo : "/images/dummy.png"}
            width={45}
            height={45}
            alt="user"
            className="rounded-full"
          />
          <div className="flex flex-col flex-1 items-start justify-between gap-[6px]">
            <div className="text-[#FFFFFFE5] font-spacegrotesk font-medium text-xl">
              {" "}
              {user && user.name ? user.name : ""} {`(you)`}{" "}
            </div>
            <div className="text-[#858585] font-spacegrotesk text-base font-normal">
              {" "}
              {user && user.email ? user.email : ""}{" "}
            </div>
          </div>
          <div className="w-[10%] text-[#858585] font-spacegrotesk text-base font-normal">
            Owner
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-start gap-4">
        <div className="rounded-full p-3 bg-[#141414] border border-solid border-[#FFFFFF1A]">
          <Image
            src="/icons/lock-closed.svg"
            width={15}
            height={15}
            alt="access"
          />
        </div>
        <div className="w-full flex flex-col flex-1">
          <div className="w-full flex items-center justify-between gap-10 font-spacegrotesk font-normal">
            <div className=" flex flex-1 items-center gap-2 text-[#FFFFFFE5] text-lg justify-between bg-[#292929] rounded px-3 py-2 font-spacegrotesk font-normal">
              <div className=" w-fit font-medium font-spacegrotesk">
                {selectedOption}
              </div>
              <button
                className="bg-transparent w-[10%]"
                onClick={toggleDropdown}
              >
                <FiChevronDown
                  style={{
                    transform: `rotate(${rotateDegree}deg)`,
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              {isOpen && (
                <ul className=" absolute mt-2 top-[65%] left-[19%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 pr-10 flex flex-col">
                  {options.map((option) => (
                    <li
                      key={option.name}
                      value={option.name}
                      className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                      onClick={() =>
                        handleOptionClick(option.value, option.name)
                      }
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {ispublic && (
              <div className="w-fit flex items-center gap-3 text-[#FFFFFFE5] text-lg justify-between bg-[#292929] rounded px-3 py-2 font-spacegrotesk font-normal">
                <div className=" w-fit font-medium font-spacegrotesk">
                  {mode}
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
                {isOpen2 && (
                  <ul className=" absolute mt-2 top-[34%] right-[10%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2  flex flex-col">
                    <li
                      className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                      onClick={() => {
                        setMode("user");
                        setIsOpen2(false);
                        setRotateDegree2(0);
                      }}
                    >
                      user
                    </li>
                    <li
                      className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                      onClick={() => {
                        setMode("editor");
                        setIsOpen2(false);
                        setRotateDegree2(0);
                      }}
                    >
                      editor
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="text-[#858585] font-spacegrotesk font-normal text-base">
            {ispublic ? (
              <div className="">
                Anyone on the internet with the link can view
              </div>
            ) : (
              <div className="">
                Only people with access can open with the link
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="font-spacegrotesk text-base text-[#FFFFFFD9] font-normal text-center bg-[#0784C6] rounded px-24 py-4">
        Update Access
      </button>
      <button className="font-spacegrotesk text-[15px] underline font-normal text-center cursor-pointer">
        Cancel
      </button>
    </div>
  );
};

export default AccessModal;
